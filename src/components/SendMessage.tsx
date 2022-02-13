import * as React from 'react';

export default function (props: React.ComponentProps<'button'>) {
  return (
    <div className='w-fit rounded-md bg-red-700 p-4 text-2xl text-white'>
      <button {...props}>Send</button>
    </div>
  );
}
