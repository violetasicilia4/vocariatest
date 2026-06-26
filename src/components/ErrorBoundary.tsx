import { Component, type ErrorInfo, type ReactNode } from 'react';

/**
 * Error boundary mínimo (sin dependencias externas).
 *
 * Objetivo: que un error de render o una falla al cargar un chunk lazy (p. ej.
 * el flujo del test, que se importa dinámicamente) NUNCA deje una pantalla en
 * blanco. Muestra un fallback on-brand con una acción de recuperación.
 *
 * - `onReset`: acción de recuperación (p. ej. cerrar el test y volver al inicio).
 *   Si no se pasa, el botón recarga la página.
 * - No se loguea PII: sólo el error técnico, y sólo en consola.
 */
interface Props {
  children: ReactNode;
  /** Texto del botón de recuperación. Default: "Reintentar". */
  resetLabel?: string;
  /** Acción de recuperación. Si falta, recarga la página. */
  onReset?: () => void;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Log técnico (sin datos personales). En prod queda en la consola del
    // navegador; si más adelante se suma un servicio de errores (p. ej. Sentry),
    // este es el punto de enganche.
    console.error('[ErrorBoundary]', error.message, info.componentStack);
  }

  private handleReset = (): void => {
    if (this.props.onReset) {
      this.setState({ hasError: false });
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="fixed inset-0 z-[200] bg-paper flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display font-black text-[22px] text-ink tracking-tight mb-2">
          Algo no cargó bien
        </h1>
        <p className="text-ink/60 text-[14px] font-medium leading-relaxed mb-6 max-w-sm">
          Tuvimos un problema al mostrar esta parte. Podés reintentar; tus datos no se perdieron.
        </p>
        <button
          onClick={this.handleReset}
          className="px-7 py-3.5 text-[15px] bg-ink text-white font-display font-black tracking-wide rounded-full hover:bg-brand-lime hover:text-slate-950 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky/45 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          {this.props.resetLabel ?? 'Reintentar'}
        </button>
      </div>
    );
  }
}
