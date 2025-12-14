"use client";
import { useSendCalls } from 'wagmi';

export default function SendCallsButton() {
  const { sendCalls } = useSendCalls();

  return (
    <button
      onClick={() =>
        sendCalls({
          calls: [
            {
              to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              data: '0xdeadbeef',
            },
          ],
        })
      }
    >
      Send calls
    </button>
  );
}
