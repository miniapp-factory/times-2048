"use client";
import { useSendCalls } from 'wagmi';
import { parseEther } from 'viem';
import { Attribution } from 'ox/erc8021';

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
          capabilities: {
            dataSuffix: Attribution.toDataSuffix({ codes: ['bc_zro9hkjd'] }),
          },
        })
      }
    >
      Send calls
    </button>
  );
}
