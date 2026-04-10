import React from 'react';

const DonateButton = () => {
  return (
    <a 
      href="https://payments.cashfree.com/forms/shrey" 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block"
    >
      <div className="flex items-center p-2.5 rounded-[15px] border border-black cursor-pointer bg-[#a3d4ec] hover:opacity-90 transition-opacity w-fit">
        <div className="flex-shrink-0">
          <img 
            src="https://cashfree-checkoutcartimages-prod.cashfree.com/Gemini_Generated_Image_f9h0qwf9h0qwf9h0ia7fipokp6g0_prod.png" 
            alt="logo" 
            className="w-10 h-10"
          />
        </div>
        <div className="flex flex-col items-center justify-center mx-2.5">
          <div className="font-['Verdana'] text-black mb-1.25 text-sm">
            Buy me a coffee
          </div>
          <div className="font-['Verdana'] text-black text-[10px] flex items-center gap-1">
            <span>Powered By Cashfree</span>
            <img 
              src="https://cashfreelogo.cashfree.com/cashfreepayments/logosvgs/Group_4355.svg" 
              alt="logo" 
              className="w-4 h-4 align-middle"
            />
          </div>
        </div>
      </div>
    </a>
  );
};

export default DonateButton;
