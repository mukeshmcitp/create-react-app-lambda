import { MessageCircle } from "lucide-react";

const WA_LINK =
  "https://api.whatsapp.com/send?phone=919529994652&text=Hi%20I%20am%20interested%20in%20your%20services";

const messages = [
  "💬 Need Help? Chat with us instantly on WhatsApp for quick support!",
  "🚀 Get instant DevOps support – Click here to chat on WhatsApp!",
  "🎓 Enroll today in our DevOps & Cloud Master Program – Talk to us on WhatsApp!",
  "⚡ Real-time project support available 24/7 – Message us on WhatsApp now!",
];

const WhatsAppTicker = () => {
  // Duplicate the content so the marquee loops seamlessly
  const items = [...messages, ...messages];

  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group block w-full bg-[#25D366] text-white overflow-hidden border-b border-[#1ebe57] hover:bg-[#1ebe57] transition-colors"
    >
      <div className="flex items-center">
        {/* Static label */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#128C7E] font-semibold text-sm shrink-0">
          <MessageCircle size={16} fill="currentColor" />
          <span>WhatsApp Support</span>
        </div>

        {/* Scrolling marquee */}
        <div className="relative flex-1 overflow-hidden py-2">
          <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
            {items.map((msg, i) => (
              <span
                key={i}
                className="mx-8 text-sm font-medium inline-flex items-center gap-2"
              >
                {msg}
                <span className="opacity-70">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* CTA on the right */}
        <div className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-[#128C7E] font-semibold text-sm shrink-0 group-hover:bg-[#0e6b60] transition-colors">
          <span>Chat Now</span>
          <MessageCircle size={14} fill="currentColor" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppTicker;
