import React from 'react';

const DonateButton = () => {
  return (
    <a 
      href="https://payments.cashfree.com/forms/shrey" 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block group"
    >
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border-2 border-meow-accent/20 cursor-pointer hover:border-meow-accent hover:bg-meow-pink/5 transition-all w-fit shadow-sm hover:shadow-md">
        <div className="flex-shrink-0 relative w-10 h-10 overflow-hidden rounded-xl border border-meow-charcoal/5">
          <img 
            src="https://cashfree-checkoutcartimages-prod.cashfree.com/Gemini_Generated_Image_f9h0qwf9h0qwf9h0ia7fipokp6g0_prod.png" 
            alt="logo" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-start justify-center pr-2">
          <div className="font-bold text-meow-charcoal text-sm mb-0.5 group-hover:text-meow-accent transition-colors">
            Buy me a coffee
          </div>
          <div className="font-medium text-meow-charcoal/50 text-[10px] flex items-center gap-1.5">
            <span>Powered By Cashfree</span>
            <img 
              src="https://cashfreelogo.cashfree.com/cashfreepayments/logosvgs/Group_4355.svg" 
              alt="logo" 
              className="w-3.5 h-3.5 align-middle opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all"
            />
          </div>
        </div>
      </div>
    </a>
  );
};

export default DonateButton;
