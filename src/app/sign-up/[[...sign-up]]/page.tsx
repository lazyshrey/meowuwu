import { SignUp } from "@clerk/nextjs";
import { PawPrint } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-linear-to-br from-[#FFF5F7] via-[#F0F9FF] to-[#FFF5F7] flex flex-col items-center justify-center p-6">
      {/* Decorative Background Icons */}
      <div className="absolute top-10 right-10 text-meow-accent/10 rotate-12 animate-pulse">
        <PawPrint size={180} />
      </div>
      <div className="absolute top-1/4 left-20 text-meow-accent/5 -rotate-12 blur-[1px]">
        <PawPrint size={120} />
      </div>
      <div className="absolute bottom-20 right-1/4 text-meow-accent/5 rotate-45">
        <PawPrint size={100} />
      </div>

      <div className="relative z-10 w-full max-w-[480px]">
        <SignUp
          forceRedirectUrl="/dashboard"
          appearance={{
            variables: {
              colorPrimary: "#ec5177",
              colorText: "#333333",
              colorTextSecondary: "rgba(51, 51, 51, 0.5)",
              borderRadius: "2rem",
              fontFamily: "var(--font-quicksand)",
            },
            elements: {
              rootBox: "w-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden border-none bg-white",
              card: "bg-white p-10 md:p-14 border-none shadow-none w-full",
              headerTitle: "Join the Pride!",
              headerSubtitle: "Create your cute link card in seconds",
              socialButtonsBlockButton: "w-full border-2 border-meow-charcoal/5 rounded-2xl p-4 font-bold text-meow-charcoal/80 hover:bg-meow-charcoal/5 transition-all flex items-center justify-center h-14",
              socialButtonsBlockButtonText: "font-bold text-meow-charcoal/80 text-base",
              dividerRow: "my-10",
              dividerText: "text-xs font-black uppercase tracking-widest text-meow-charcoal/20",
              formFieldLabel: "text-xs font-black text-meow-charcoal mb-3 uppercase tracking-widest",
              formFieldInput: "w-full bg-meow-charcoal/[0.03] border-2 border-transparent rounded-2xl p-4 h-14 font-bold text-meow-charcoal focus:bg-white focus:border-meow-accent/20 transition-all outline-none",
              formButtonPrimary: "w-full bg-meow-accent text-white h-16 rounded-2xl font-black text-xl shadow-2xl shadow-meow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4",
              footerActionText: "text-sm font-bold text-meow-charcoal/40 text-center mt-10",
              footerActionLink: "text-meow-accent font-black hover:underline ml-1",
              footer: "hidden",
            },
            layout: {
              socialButtonsPlacement: "bottom",
              showOptionalFields: false,
            }
          }}
        />
      </div>

      {/* Small Attribution */}
      <div className="mt-12 text-xs font-bold text-meow-charcoal/20">
        © 2026 Meowuwu Platform • All rights purr-served
      </div>
    </div>
  );
}
