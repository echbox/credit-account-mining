import { TerminalError, TerminalErrorCodes } from './terminal-error';

interface IMetamaskError {
  code: number;
  message: string;
}

type KnownMetamaskErrors = Extract<TerminalErrorCodes, 'METAMASK_RELOGIN' | 'DENIED_BY_USER'>;

const MetamaskDictionary: Record<number, KnownMetamaskErrors> = {
  [-32002]: 'METAMASK_RELOGIN',
  [-32603]: 'DENIED_BY_USER',
  4001: 'DENIED_BY_USER',
};

class ErrorHub {
  static isTerminalError = (e: any): e is TerminalError => e instanceof TerminalError;

  static isMetamaskError = (e: any): e is IMetamaskError => {
    if (!e) return false;
    if (typeof e !== 'object') return false;
    if (typeof e.code !== 'number' || typeof e.message !== 'string') return false;
    return true;
  };

  static processMetamaskError = (e: IMetamaskError): TerminalError => {
    const terminalCode = MetamaskDictionary[e.code];
    return terminalCode
      ? new TerminalError({ code: terminalCode, name: 'Metamask error' })
      : new TerminalError({
        code: 'UNEXPECTED_ERROR',
        name: 'Metamask error',
      });
  };

  static getTypedError = (e: any): TerminalError => {
    if (this.isTerminalError(e)) return e;
    if (this.isMetamaskError(e)) return this.processMetamaskError(e);

    return new TerminalError({ code: 'UNEXPECTED_ERROR' });
  };
}

export type { IMetamaskError };
export { ErrorHub };
