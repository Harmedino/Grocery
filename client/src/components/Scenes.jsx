// Illustrated scenes built from layered 3D images. Each one is replaced by a real
// photo when its slot in PHOTOS (config/store.js) is filled in.
// Positions are percentages so each scene scales with its container.
import { PHOTOS, STORE } from "../config/store";

const scene = (name) => `/images/scenes/${name}.webp`;
const product = (name) => `/images/products/${name}.webp`;

const Layer = ({ src, className }) => (
  <img src={src} alt="" aria-hidden="true" draggable="false" className={`absolute select-none ${className}`} />
);

// Stylised naira note (the emoji set only has dollar/euro/yen notes)
export const NairaNote = ({ className = "", value = "1000" }) => (
  <svg viewBox="0 0 160 84" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="naira-note" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#7fbf8f" />
        <stop offset="1" stopColor="#3f8f5a" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="156" height="80" rx="10" fill="url(#naira-note)" stroke="#2f6f45" strokeWidth="3" />
    <rect x="12" y="12" width="136" height="60" rx="6" fill="none" stroke="#e8f5ec" strokeOpacity=".7" strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="48" cy="42" r="20" fill="#e8f5ec" fillOpacity=".85" />
    <text x="48" y="51" textAnchor="middle" fontSize="26" fontWeight="800" fill="#2f6f45" fontFamily="system-ui, sans-serif">₦</text>
    <text x="132" y="36" textAnchor="end" fontSize="20" fontWeight="800" fill="#fff" fontFamily="system-ui, sans-serif">{value}</text>
    <text x="132" y="58" textAnchor="end" fontSize="10" fontWeight="700" fill="#e8f5ec" fontFamily="system-ui, sans-serif" letterSpacing="2">NAIRA</text>
  </svg>
);

const Photo = ({ src, alt, className = "" }) => (
  <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />
);

const Chip = ({ icon, children, className }) => (
  <div className={`sticker absolute rounded-2xl px-3 py-2 text-sm text-ink ${className}`}>
    <img src={scene(icon)} alt="" aria-hidden="true" className="size-8" />
    <span className="leading-tight">{children}</span>
  </div>
);

export const HeroScene = () =>
  PHOTOS.hero ? (
    <div className="mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-[2rem] border-2 border-ink">
      <Photo src={PHOTOS.hero} alt={`Shopping with ${STORE.name}`} />
    </div>
  ) : (
  <div className="relative mx-auto aspect-square w-full max-w-[520px]">
    <div className="absolute inset-[4%] rounded-full border-2 border-ink bg-white" />
    <div className="absolute inset-[16%] rounded-full border-2 border-dashed border-ink/25 bg-sun-soft" />

    <Layer src={scene("grandma")} className="left-[12%] top-[14%] w-[44%] drop-shadow-xl" />

    {/* basket filled with produce */}
    <Layer src={product("pineapple")} className="bottom-[33%] right-[25%] w-[15%] animate-float [animation-delay:-1s]" />
    <Layer src={product("tomato")} className="bottom-[29%] right-[10%] w-[14%]" />
    <Layer src={product("bread")} className="bottom-[28%] right-[35%] w-[13%]" />
    <Layer src={scene("basket")} className="bottom-[6%] right-[6%] w-[44%] drop-shadow-xl" />

    <Layer src={product("avocado")} className="left-[6%] top-[58%] w-[12%] animate-float [animation-delay:-2s]" />
    <Layer src={product("egg")} className="right-[14%] top-[10%] w-[10%] animate-float [animation-delay:-3s]" />
    <Layer src={product("chili")} className="right-[4%] top-[34%] w-[10%] animate-float [animation-delay:-4s]" />

    <Chip icon="scooter" className="bottom-[12%] left-[2%] -rotate-3 sm:left-[4%]">On its way<br />to your door</Chip>
    <Chip icon="thumbs-up" className="right-[0%] top-[2%] rotate-3 sm:right-[2%]">Pay when<br />it arrives</Chip>
  </div>
  );

const StepFrame = ({ tint, photo, alt, children }) => (
  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-ink" style={{ backgroundColor: tint }}>
    {photo ? <Photo src={photo} alt={alt} /> : children}
  </div>
);

export const StepChoose = () => (
  <StepFrame tint="#EAF4FF" photo={PHOTOS.stepChoose} alt="Ordering groceries on a phone">
    <Layer src={scene("phone")} className="left-[36%] top-[10%] w-[40%] -rotate-6 drop-shadow-xl" />
    <Layer src={scene("old-woman")} className="bottom-[4%] left-[8%] w-[38%] drop-shadow-lg" />
    <Layer src={product("tomato")} className="right-[8%] top-[12%] w-[16%] animate-float" />
    <Layer src={product("bread")} className="bottom-[10%] right-[6%] w-[18%]" />
  </StepFrame>
);

export const StepPack = () => (
  <StepFrame tint="#EDF8EF" photo={PHOTOS.stepPack} alt="Packing a customer's order">
    <Layer src={scene("attendant")} className="bottom-0 left-[6%] w-[42%] drop-shadow-lg" />
    <Layer src={product("pineapple")} className="bottom-[34%] right-[22%] w-[16%]" />
    <Layer src={product("banana")} className="bottom-[30%] right-[8%] w-[16%]" />
    <Layer src={scene("basket")} className="bottom-[4%] right-[4%] w-[46%] drop-shadow-lg" />
  </StepFrame>
);

export const StepDeliver = () => (
  <StepFrame tint="#FFF3E6" photo={PHOTOS.stepDeliver} alt="Delivery rider on the way">
    <Layer src={scene("house")} className="bottom-[8%] right-[6%] w-[42%] drop-shadow-lg" />
    <Layer src={scene("man")} className="bottom-[40%] left-[20%] w-[18%]" />
    <Layer src={scene("scooter")} className="bottom-[6%] left-[4%] w-[46%] drop-shadow-lg" />
    <Layer src={scene("package")} className="left-[44%] top-[8%] w-[16%] animate-float" />
  </StepFrame>
);

// Customer paying the rider at her door: cash or transfer
export const PayOnDeliveryScene = ({ compact = false }) => (
  <div className={`relative w-full overflow-hidden rounded-3xl border-2 border-ink bg-sun-soft ${compact ? "aspect-[4/3]" : "aspect-[5/4]"}`}>
    {PHOTOS.payOnDelivery ? (
      <Photo src={PHOTOS.payOnDelivery} alt="A customer paying the delivery rider at her door" />
    ) : (
    <>
    <Layer src={scene("house")} className="right-[2%] top-[4%] w-[34%] opacity-90" />
    {/* rider with the delivery */}
    <Layer src={scene("man")} className="bottom-[33%] left-[14%] w-[20%]" />
    <Layer src={scene("scooter")} className="bottom-[2%] left-[0%] w-[42%] drop-shadow-lg" />
    <Layer src={scene("bags")} className="bottom-[30%] left-[36%] w-[16%] drop-shadow-lg" />
    {/* customer at her door paying */}
    <Layer src={scene("grandma")} className="bottom-[6%] right-[6%] w-[34%] drop-shadow-xl" />
    <NairaNote className="absolute bottom-[40%] right-[34%] w-[24%] -rotate-12 drop-shadow-lg" />
    <NairaNote className="absolute bottom-[34%] right-[30%] w-[24%] rotate-6 drop-shadow-lg" value="500" />
    {!compact && (
      <Chip icon="phone" className="left-[4%] top-[6%] -rotate-2">Or pay by<br />bank transfer</Chip>
    )}
    <Chip icon="check" className="bottom-[4%] left-[40%] rotate-2">Paid at<br />the door</Chip>
    </>
    )}
  </div>
);

export const StepPay = () => (
  <StepFrame tint="#F4EEFB" photo={PHOTOS.stepPay} alt="Paying the rider at the door">
    <Layer src={scene("grandma")} className="bottom-0 right-[6%] w-[42%] drop-shadow-lg" />
    <Layer src={scene("man")} className="bottom-[4%] left-[6%] w-[30%]" />
    <NairaNote className="absolute left-[30%] top-[22%] w-[34%] -rotate-12 drop-shadow-lg animate-float" />
  </StepFrame>
);

export const ShopScene = () => (
  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border-2 border-ink bg-sun-soft">
    {PHOTOS.shop ? (
      <Photo src={PHOTOS.shop} alt={`Inside ${STORE.name}`} />
    ) : (
    <>
    <Layer src={scene("store")} className="left-[28%] top-[8%] w-[44%] drop-shadow-xl" />
    <Layer src={scene("attendant")} className="bottom-0 left-[4%] w-[30%]" />
    <Layer src={scene("headscarf")} className="bottom-0 right-[4%] w-[28%]" />
    <Layer src={scene("bags")} className="bottom-[6%] left-[40%] w-[20%] drop-shadow-lg" />
    <Layer src={product("watermelon")} className="right-[10%] top-[10%] w-[14%] animate-float" />
    </>
    )}
  </div>
);
