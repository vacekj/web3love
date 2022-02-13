import * as React from 'react';
import { useMoralis } from 'react-moralis';

export default function ConnectButton() {
  const { authenticate, isAuthenticated, user } = useMoralis();
  return (
    <>
      <button
        onClick={() => authenticate({ provider: 'walletConnect' })}
        className='mt-8 rounded-md bg-orange-100 p-4 text-2xl'
      >
        {'WalletConnect'}
      </button>
      <button
        onClick={() => authenticate({ provider: 'metamask' })}
        className='mt-8 rounded-md bg-orange-100 p-4 text-2xl'
      >
        {'MetaMask'}
      </button>
    </>
  );
}
