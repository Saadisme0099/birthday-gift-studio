"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Cake, Check, Heart, Sparkles, Volume2, VolumeX } from "lucide-react";

const memories = [
  { title: "The little things", emoji: "🌷", text: "The random laughs, the long talks, and the moments that become favourite memories without warning.", tone: "rose" },
  { title: "Your kind of magic", emoji: "✨", text: "You make ordinary days feel warmer just by being exactly who you are.", tone: "lilac" },
  { title: "More chapters ahead", emoji: "🦋", text: "Here’s to new places, ridiculous jokes, brave dreams, and a hundred more reasons to smile.", tone: "peach" },
];
const questions = [
  { q: "Pick a birthday mood", options: ["Soft & cosy ☁️", "Main character ✨", "Chaotic fun 🎉"] },
  { q: "Choose a tiny treat", options: ["Cake, obviously 🍰", "Flowers forever 💐", "A surprise trip 🗺️"] },
  { q: "Make one wish", options: ["More adventures 🌍", "More peaceful days 🌙", "All the good things 💖"] },
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [candles, setCandles] = useState([true, true, true]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [memory, setMemory] = useState(0);
  const [letterOpen, setLetterOpen] = useState(false);
  const [sound, setSound] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const replay = () => { setStep(0); setCandles([true,true,true]); setAnswers([]); setMemory(0); setLetterOpen(false); setCelebrate(false); };

  return <main className="shell">
    <header className="topbar"><a className="brand" href="#" onClick={(e) => {e.preventDefault(); replay();}}><span>✳</span> little moments studio</a><button className="sound" onClick={() => setSound(!sound)}>{sound ? <Volume2 size={15}/> : <VolumeX size={15}/>} {sound ? "Sound on" : "Sound off"}</button></header>
    <div className="progress-wrap"><div className="progress"><motion.div animate={{width:`${(step+1)/6*100}%`}} /></div><div className="progress-label"><span>YOUR LITTLE BIRTHDAY STORY</span><b>0{step+1} / 06</b></div></div>
    <AnimatePresence mode="wait">
      {step === 0 && <motion.section key="welcome" className="panel hero" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
        <div className="eyebrow"><Sparkles size={14}/> A LITTLE SOMETHING FOR YOU</div>
        <div className="gift-scene"><span className="star st1">✦</span><span className="star st2">✧</span><span className="heart h1">♡</span><motion.div className="gift" animate={{y:[0,-7,0],rotate:[0,1,-1,0]}} transition={{duration:3,repeat:Infinity}}><div className="lid"><span>∞</span></div><div className="box"><i/></div></motion.div><div className="shadow"/></div>
        <p className="script">for someone very special</p><h1>A little box of<br/><em>birthday magic.</em></h1><p className="copy">A few tiny surprises, a little love, and a moment that’s all yours.</p>
        <button className="primary" onClick={next}>Open your gift <Heart size={16} fill="currentColor"/></button><div className="tiny">MADE WITH A WHOLE LOT OF LOVE</div>
      </motion.section>}
      {step === 1 && <motion.section key="wish" className="panel" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
        <div className="eyebrow"><Sparkles size={14}/> FIRST, A LITTLE WISH</div><div className="moon">☾<span>✦</span><i>✧</i></div><p className="script">take a breath, lovely</p><h2>Before anything else,<br/><em>make a wish.</em></h2><p className="copy">Close your eyes for a second. Think of something your heart has been hoping for. Keep it just for you.</p><button className="primary" onClick={next}>My wish is made <Sparkles size={16}/></button>
      </motion.section>}
      {step === 2 && <motion.section key="cake" className="panel" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
        <div className="eyebrow"><Cake size={14}/> THE BIRTHDAY TRADITION</div><p className="script">make it official</p><h2>A cake just<br/><em>for you.</em></h2><p className="copy">Tap each little candle to blow it out. Don’t forget your wish!</p>
        <div className="cake"><div className="candles">{candles.map((lit,i)=><button key={i} aria-label={`Blow out candle ${i+1}`} className={lit?"candle lit":"candle"} onClick={()=>setCandles(old=>old.map((v,j)=>i===j?false:v))}><span>{lit?"✦":"·"}</span><i/></button>)}</div><div className="icing"/><div className="tier top-tier"/><div className="tier bottom-tier"/><div className="plate"/></div>
        <p className="tiny">{candles.some(Boolean)?"ONE TAP, ONE LITTLE WISH ✨":"WISH SENT INTO THE UNIVERSE ✨"}</p><button className="primary" onClick={next}>Keep the magic going <ArrowRight size={16}/></button>
      </motion.section>}
      {step === 3 && <motion.section key="quiz" className="panel quiz" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
        <div className="eyebrow"><Sparkles size={14}/> A TINY BIRTHDAY QUIZ</div><p className="script">just for fun</p><h2>Let’s make this<br/><em>your kind of day.</em></h2><p className="copy">No wrong answers. Just pick what feels like you.</p>
        <div className="questions">{questions.map((q,qi)=><div className="question" key={q.q}><p><b>0{qi+1}</b> {q.q}</p><div>{q.options.map((option,oi)=><button key={option} className={answers[qi]===oi?"selected":""} onClick={()=>setAnswers(old=>{const n=[...old];n[qi]=oi;return n;})}>{option}{answers[qi]===oi&&<Check size={13}/>}</button>)}</div></div>)}</div><button className="primary" onClick={next}>That’s so me <Heart size={16} fill="currentColor"/></button>
      </motion.section>}
      {step === 4 && <motion.section key="memories" className="panel" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}>
        <div className="eyebrow"><Heart size={14}/> A FEW WORDS TO KEEP</div><p className="script">little reminders</p><h2>Things worth<br/><em>remembering.</em></h2>
        <div className={`memory ${memories[memory].tone}`}><div className="memory-label">A NOTE FOR YOU · 0{memory+1}</div><div className="memory-emoji">{memories[memory].emoji}</div><h3>{memories[memory].title}</h3><p>{memories[memory].text}</p><div className="dots">{memories.map((m,i)=><button aria-label={`Show memory ${i+1}`} key={m.title} className={memory===i?"active":""} onClick={()=>setMemory(i)}/>)}</div><div className="arrows"><button aria-label="Previous memory" onClick={()=>setMemory((memory+2)%3)}><ArrowLeft size={15}/></button><button aria-label="Next memory" onClick={()=>setMemory((memory+1)%3)}><ArrowRight size={15}/></button></div></div><button className="primary" onClick={next}>One last thing <ArrowRight size={16}/></button>
      </motion.section>}
      {step === 5 && <motion.section key="finale" className="panel finale" initial={{opacity:0,scale:.98}} animate={{opacity:1,scale:1}} exit={{opacity:0,y:-10}}>
        <div className="eyebrow"><Heart size={14}/> THE MOST IMPORTANT PART</div><div className="envelope">♡<span>✦</span></div><p className="script">from my heart to yours</p><h2>One little<br/><em>letter for you.</em></h2><p className="copy">Because some things deserve more than a birthday text.</p><button className="primary" onClick={()=>setLetterOpen(!letterOpen)}>{letterOpen?"Close your letter":"Read your letter"} <Heart size={16} fill="currentColor"/></button>
        <AnimatePresence>{letterOpen&&<motion.div className="letter" initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}}><p>Dear you,</p><p>I hope this next trip around the sun brings you gentleness on the hard days, people who see the real you, and little moments that remind you how wonderful life can be.</p><p>You deserve good things—not just today, but in all the ordinary days after it, too.</p><p className="signoff">Happy birthday, with love. ♡</p></motion.div>}</AnimatePresence>
        <button className="text-button" onClick={()=>setCelebrate(true)}><Sparkles size={15}/>{celebrate?"Make a wish, birthday star!":"One more sprinkle of magic"}</button>{celebrate&&<div className="confetti">{Array.from({length:32},(_,i)=><motion.span key={i} initial={{opacity:0,y:-10}} animate={{opacity:[0,1,0],y:[0,90+(i%6)*12],x:[0,(i%2?1:-1)*(15+i%7)*3],rotate:220+i*31}} transition={{duration:1.8,delay:(i%10)*.04}} style={{left:`${(i*37)%100}%`}}>{["✦","♡","✧","·"][i%4]}</motion.span>)}</div>}<button className="restart" onClick={replay}>Replay your birthday story ↺</button>
      </motion.section>}
    </AnimatePresence>
    {step>0&&<button className="back" onClick={back}><ArrowLeft size={14}/> Go back</button>}
    <footer><span>MADE FOR YOUR MOMENT</span><span>✳ WITH LOVE, ALWAYS ✳</span></footer>
  </main>;
}