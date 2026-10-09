"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Eye, Gift, Heart, Palette, Sparkles } from "lucide-react";

type GiftContent = {
  recipient: string; sender: string; headline: string; intro: string; letter: string;
  memory1Title: string; memory1Text: string; memory2Title: string; memory2Text: string;
  memory3Title: string; memory3Text: string; theme: string;
};
const defaults: GiftContent = {
  recipient: "Ananya", sender: "Someone who loves you", headline: "A little box of birthday magic.",
  intro: "A few tiny surprises, a little love, and a moment that's all yours.",
  letter: "I hope this next trip around the sun brings you gentleness on the hard days, people who see the real you, and little moments that remind you how wonderful life can be. You deserve good things—not just today, but in all the ordinary days after it, too.",
  memory1Title: "The little things", memory1Text: "The random laughs, the long talks, and the moments that become favourite memories without warning.",
  memory2Title: "Your kind of magic", memory2Text: "You make ordinary days feel warmer just by being exactly who you are.",
  memory3Title: "More chapters ahead", memory3Text: "Here's to new places, ridiculous jokes, brave dreams, and a hundred more reasons to smile.",
  theme: "rose",
};
const themes: Record<string,{label:string;main:string;soft:string}> = {
  rose:{label:"Rose garden",main:"#b9687d",soft:"#f9e9ed"},
  lavender:{label:"Lavender dream",main:"#8c76b7",soft:"#f0ebf8"},
  peach:{label:"Peach glow",main:"#c77d59",soft:"#fff0e6"},
  mint:{label:"Mint wishes",main:"#568c7c",soft:"#e8f4ee"},
};
const memoriesKeys = [
  {title:"memory1Title",text:"memory1Text",emoji:"🌷"},
  {title:"memory2Title",text:"memory2Text",emoji:"✨"},
  {title:"memory3Title",text:"memory3Text",emoji:"🦋"},
] as const;

export default function Home() {
  const [gift,setGift] = useState<GiftContent>(defaults);
  const [preview,setPreview] = useState(false);
  const [step,setStep] = useState(0);
  const [letterOpen,setLetterOpen] = useState(false);
  const [memory,setMemory] = useState(0);
  const [candles,setCandles] = useState([true,true,true]);
  const [celebrate,setCelebrate] = useState(false);
  const [copied,setCopied] = useState(false);
  const update = (key:keyof GiftContent,value:string) => setGift(old=>({...old,[key]:value}));
  const startPreview = () => {setStep(0);setPreview(true);setLetterOpen(false);setMemory(0);setCandles([true,true,true]);setCelebrate(false);};
  const reset = () => {setPreview(false);setStep(0);};
  const theme = themes[gift.theme] ?? themes.rose;

  return <main className={preview?"shell recipient-shell":"builder-shell"} style={{"--accent":theme.main,"--soft":theme.soft} as React.CSSProperties}>
    {!preview ? <>
      <header className="builder-top"><a className="brand" href="#" onClick={e=>{e.preventDefault();setGift(defaults);}}><span>✳</span> little moments studio</a><div className="builder-top-actions"><span className="draft-status"><i/> Draft · saved in this session</span><button className="preview-button" onClick={startPreview}><Eye size={15}/> Preview gift</button></div></header>
      <div className="builder-heading"><div className="eyebrow"><Sparkles size={14}/> YOUR IDEA, YOUR GIFT</div><h1>Make it <em>personal.</em></h1><p>Make a birthday page that feels like them. Change the words, choose a vibe, and preview it live.</p></div>
      <div className="builder-layout">
        <section className="editor-panel">
          <div className="editor-title"><span className="editor-icon"><Gift size={17}/></span><div><h2>Your birthday gift</h2><p>Make it yours. Every field is editable.</p></div></div>
          <div className="form-section"><div className="form-section-heading"><span>01</span><h3>The people</h3></div>
            <label>Who is this gift for?<input value={gift.recipient} onChange={e=>update("recipient",e.target.value)} placeholder="Their name"/></label>
            <label>From<input value={gift.sender} onChange={e=>update("sender",e.target.value)} placeholder="Your name or nickname"/></label>
          </div>
          <div className="form-section"><div className="form-section-heading"><span>02</span><h3>The first impression</h3></div>
            <label>Birthday headline<input value={gift.headline} onChange={e=>update("headline",e.target.value)} placeholder="A little birthday magic"/></label>
            <label>Welcome message<textarea value={gift.intro} onChange={e=>update("intro",e.target.value)} rows={3} placeholder="Write a little hello..."/></label>
          </div>
          <div className="form-section"><div className="form-section-heading"><span>03</span><h3>Three little memories</h3></div>
            {memoriesKeys.map((m,i)=><div className="memory-fields" key={m.title}><div className="memory-field-heading"><span>{m.emoji} Memory {i+1}</span></div><label>Title<input value={gift[m.title]} onChange={e=>update(m.title,e.target.value)} /></label><label>Message<textarea rows={2} value={gift[m.text]} onChange={e=>update(m.text,e.target.value)} /></label></div>)}
          </div>
          <div className="form-section"><div className="form-section-heading"><span>04</span><h3>Your letter</h3></div><label>Write from the heart<textarea rows={6} value={gift.letter} onChange={e=>update("letter",e.target.value)} placeholder="Write a message they can keep..."/></label></div>
          <div className="form-section"><div className="form-section-heading"><span>05</span><h3>Pick a colour mood</h3></div><div className="theme-choices">{Object.entries(themes).map(([key,t])=><button key={key} className={gift.theme===key?"theme-choice active":"theme-choice"} onClick={()=>update("theme",key)}><i style={{background:t.main}}/><span>{t.label}</span>{gift.theme===key&&<Check size={14}/>}</button>)}</div></div>
          <div className="editor-bottom"><button className="reset-button" onClick={()=>setGift(defaults)}>Reset demo content</button><button className="primary" onClick={startPreview}>Preview {gift.recipient.trim()||"your gift"} <ArrowRight size={16}/></button></div>
          <p className="session-note">Prototype note: edits currently live in this browser session. Saving projects and publishing unique links is the next build step.</p>
        </section>
        <aside className="live-preview">
          <div className="preview-label"><span><Eye size={14}/> LIVE PREVIEW</span><span className="live-dot">UPDATING</span></div>
          <div className="preview-paper" style={{background:theme.soft}}>
            <div className="preview-sparkles">✦ <span>✧</span> ✦</div><div className="preview-gift"><div className="preview-lid">∞</div><div className="preview-box"><i/></div></div>
            <p className="script">a little something for</p><h2>{gift.recipient.trim()||"Someone special"}<span>,</span></h2><h3>{gift.headline||"Your birthday headline"}</h3><p className="preview-intro">{gift.intro||"Your welcome message will appear here."}</p><div className="preview-divider">♡</div><div className="preview-memory"><span>{memoriesKeys[memory].emoji}</span><b>{gift[memoriesKeys[memory].title]||"Memory title"}</b><p>{gift[memoriesKeys[memory].text]||"Your memory message will appear here."}</p></div><div className="preview-letter">A LETTER FOR YOU <span>✉</span></div><div className="preview-signoff">with love, {gift.sender.trim()||"someone who cares"} ♡</div>
          </div>
          <div className="preview-tip"><Sparkles size={15}/><p><b>Make it yours</b><br/>Try editing the recipient's name or changing the colour theme. Watch this preview update as you type.</p></div>
          <button className="wide-preview-button" onClick={startPreview}>Experience the gift <ArrowRight size={16}/></button>
        </aside>
      </div>
      <footer className="builder-footer"><span>MADE FOR YOUR MOMENT</span><span>✳ WITH LOVE, ALWAYS ✳</span></footer>
    </> : <>
      <header className="topbar"><button className="back-to-editor" onClick={reset}><ArrowLeft size={15}/> Back to editor</button><span className="previewing-pill"><Eye size={13}/> Recipient preview</span></header>
      <div className="progress-wrap"><div className="progress"><motion.div animate={{width:`${(step+1)/5*100}%`}} /></div><div className="progress-label"><span>A LITTLE BIRTHDAY STORY FOR {gift.recipient.toUpperCase()||"YOU"}</span><b>0{step+1} / 05</b></div></div>
      <AnimatePresence mode="wait">
        {step===0&&<motion.section key="welcome" className="panel hero" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}><div className="eyebrow"><Sparkles size={14}/> A LITTLE SOMETHING FOR YOU</div><div className="gift-scene"><span className="star st1">✦</span><span className="star st2">✧</span><span className="heart h1">♡</span><motion.div className="gift" animate={{y:[0,-7,0],rotate:[0,1,-1,0]}} transition={{duration:3,repeat:Infinity}}><div className="lid"><span>∞</span></div><div className="box"><i/></div></motion.div><div className="shadow"/></div><p className="script">for {gift.recipient.trim()||"someone very special"}</p><h1>{gift.headline||"A little birthday magic."}</h1><p className="copy">{gift.intro}</p><button className="primary" onClick={()=>setStep(1)}>Open your gift <Heart size={16} fill="currentColor"/></button><div className="tiny">MADE WITH A WHOLE LOT OF LOVE</div></motion.section>}
        {step===1&&<motion.section key="cake" className="panel" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}><div className="eyebrow"><Sparkles size={14}/> FIRST, A LITTLE WISH</div><div className="moon">☾<span>✦</span><i>✧</i></div><p className="script">take a breath, {gift.recipient.trim()||"lovely"}</p><h2>Before anything else,<br/><em>make a wish.</em></h2><p className="copy">Close your eyes for a second. Think of something your heart has been hoping for. Keep it just for you.</p><button className="primary" onClick={()=>setStep(2)}>My wish is made <Sparkles size={16}/></button></motion.section>}
        {step===2&&<motion.section key="memories" className="panel" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}><div className="eyebrow"><Heart size={14}/> A FEW WORDS TO KEEP</div><p className="script">little reminders</p><h2>Things worth<br/><em>remembering.</em></h2><div className={`memory ${gift.theme==="lavender"?"lilac":gift.theme==="peach"?"peach":""}`}><div className="memory-label">A NOTE FOR YOU · 0{memory+1}</div><div className="memory-emoji">{memoriesKeys[memory].emoji}</div><h3>{gift[memoriesKeys[memory].title]}</h3><p>{gift[memoriesKeys[memory].text]}</p><div className="dots">{memoriesKeys.map((m,i)=><button aria-label={`Show memory ${i+1}`} key={m.title} className={memory===i?"active":""} onClick={()=>setMemory(i)}/>)}</div><div className="arrows"><button aria-label="Previous memory" onClick={()=>setMemory((memory+2)%3)}><ArrowLeft size={15}/></button><button aria-label="Next memory" onClick={()=>setMemory((memory+1)%3)}><ArrowRight size={15}/></button></div></div><button className="primary" onClick={()=>setStep(3)}>A letter for you <ArrowRight size={16}/></button></motion.section>}
        {step===3&&<motion.section key="letter" className="panel finale" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}><div className="eyebrow"><Heart size={14}/> THE MOST IMPORTANT PART</div><div className="envelope">♡<span>✦</span></div><p className="script">from {gift.sender.trim()||"someone who loves you"}</p><h2>One little<br/><em>letter for you.</em></h2><button className="primary" onClick={()=>setLetterOpen(!letterOpen)}>{letterOpen?"Close your letter":"Read your letter"} <Heart size={16} fill="currentColor"/></button><AnimatePresence>{letterOpen&&<motion.div className="letter" initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}}><p>Dear {gift.recipient.trim()||"you"},</p><p>{gift.letter}</p><p className="signoff">Happy birthday, with love. ♡</p></motion.div>}</AnimatePresence><button className="primary" onClick={()=>setStep(4)}>One last thing <ArrowRight size={16}/></button></motion.section>}
        {step===4&&<motion.section key="finale" className="panel finale" initial={{opacity:0,scale:.98}} animate={{opacity:1,scale:1}} exit={{opacity:0,y:-10}}><div className="eyebrow"><Heart size={14}/> MADE JUST FOR YOU</div><div className="envelope">♡<span>✦</span></div><p className="script">with all my love</p><h2>Happy birthday,<br/><em>{gift.recipient.trim()||"you"}!</em></h2><p className="copy">May this year be kind to you, full of unexpected joy, and sprinkled with little moments worth keeping.</p><button className="primary" onClick={()=>setCelebrate(true)}><Sparkles size={16}/> {celebrate?"Wishes sent!":"Sprinkle some magic"}</button>{celebrate&&<div className="confetti">{Array.from({length:30},(_,i)=><motion.span key={i} initial={{opacity:0,y:-10}} animate={{opacity:[0,1,0],y:[0,100+(i%6)*12],x:[0,(i%2?1:-1)*(15+i%7)*3],rotate:220+i*31}} transition={{duration:1.8,delay:(i%10)*.04}} style={{left:`${(i*37)%100}%`}}>{["✦","♡","✧","·"][i%4]}</motion.span>)}</div>}<p className="signoff final-signoff">Made with love by {gift.sender.trim()||"someone who cares"} ♡</p><button className="reset-button" onClick={reset}>Back to editor</button></motion.section>}
      </AnimatePresence>
      {step>0&&<button className="back" onClick={()=>setStep(s=>Math.max(0,s-1))}><ArrowLeft size={14}/> Go back</button>}
      <footer><span>MADE FOR YOUR MOMENT</span><span>✳ WITH LOVE, ALWAYS ✳</span></footer>
    </>}
  </main>;
}