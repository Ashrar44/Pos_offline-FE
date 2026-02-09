export { };

declare global {
  interface Window {
    electronAPI: {
      printBill: () => Promise<string>;
    };
  }
}
