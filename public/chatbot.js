const chatContainer = document.createElement("div")

chatContainer.innerHTML = `
    <button id="chat-btn">🤖</button>
    <div id="chat-window">
        <div id="chat-header">Foodiez Assistant</div>
        <div id="chat-messages"></div>
        <input type="text" id="chat-input" placeholder="Ask me...">
        <button id="chat-send">Send</button>
    </div>`

document.body.appendChild(chatContainer)

const style = document.createElement("style")

style.innerHTML = `

    #chat-btn {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 1000;
        width: 58px;
        height: 58px;
        border: none;
        border-radius: 50%;
        background: transparent;
        font-size: 32px;
        line-height: 1;
        cursor: pointer;
        filter: drop-shadow(0 12px 26px rgba(0, 0, 0, 0.38));
        transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.35s ease;
    }

    #chat-btn::before {
        content: "";
        position: absolute;
        inset: -3px;
        z-index: -2;
        border-radius: 50%;
        background: conic-gradient(
            from 0deg,
            rgba(212, 175, 122, 0) 0deg,
            #d4af7a 80deg,
            #f6e3bd 120deg,
            rgba(212, 175, 122, 0) 210deg,
            rgba(212, 175, 122, 0) 360deg
        );
        animation: fzOrbit 5s linear infinite;
    }
    
    #chat-btn::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        border-radius: 50%;
        background: radial-gradient(120% 120% at 30% 25%, #2b2b2f 0%, #1c1c1e 55%, #121214 100%);
        border: 1px solid rgba(212, 175, 122, 0.45);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
    }
    #chat-btn:hover {
        transform: translateY(-4px) scale(1.05);
        filter: drop-shadow(0 18px 34px rgba(212, 175, 122, 0.35));
    }
    #chat-btn:active {
        transform: translateY(-1px) scale(0.97);
    }
    @keyframes fzOrbit {
        to { transform: rotate(360deg); }
    }

    
    #chat-window {
        position: fixed;
        bottom: 96px;
        right: 24px;
        z-index: 1000;
        width: 340px;
        height: 480px;
        background: linear-gradient(135deg, #e7c894 0%, #d4af7a 45%, #b8935f 100%);
        border: 1px solid #e8e0d3;
        border-radius: 22px;
        box-shadow: 0 30px 70px -12px rgba(20, 18, 15, 0.35), 0 8px 24px rgba(20, 18, 15, 0.12);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
        transform-origin: bottom right;
        opacity: 0;
        transform: scale(0.88) translateY(18px);
        filter: blur(8px);
        pointer-events: none;
        visibility: hidden;
        transition: opacity 0.38s cubic-bezier(0.16, 1, 0.3, 1),
                    filter 0.38s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                    visibility 0.5s;
    }
    #chat-window.open {
        opacity: 1;
        transform: scale(1) translateY(0);
        filter: blur(0);
        pointer-events: auto;
        visibility: visible;
        
    }
    
    #chat-window > * {
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #chat-window.open > * {
        opacity: 1;
        transform: translateY(0);
    }
    #chat-window.open > #chat-header   { transition-delay: 0.08s; }
    #chat-window.open > #chat-messages { transition-delay: 0.16s; }
    #chat-window.open > #chat-input    { transition-delay: 0.24s; }
    #chat-window.open > #chat-send     { transition-delay: 0.30s; }

    
    #chat-header {
        position: relative;
        display: flex;
        align-items: center;
        gap: 20px;
        background: linear-gradient(135deg, #232326 0%, #17171a 60%, #1c1c1e 100%);
        color: #d4af7a;
        font-family: sans-serif;
        font-weight: 600;
        font-size: 13.5px;
        letter-spacing: 1px;
        text-transform: uppercase;
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
        padding: 15px 18px;
        border-bottom: 1px solid;
        border-image: linear-gradient(90deg, rgba(212, 175, 122, 0), rgba(212, 175, 122, 0.85), rgba(212, 175, 122, 0)) 1;
    }
   
    #chat-header::before {
        flex: none;
        display: grid;
        place-items: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: linear-gradient(140deg, #f2d9ab, #d4af7a 55%, #a87f4c);
        color: #17171a;
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 0;
        text-shadow: none;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.35);
    }
  
    #chat-header::after {
        position: absolute;
        right: 18px;
        top: 50%;
        width: 7px;
        height: 7px;
        margin-top: -3.5px;
        border-radius: 50%;
        background: #97cf82;
        animation: fzPulse 2.2s ease-out infinite;
    }
    @keyframes fzPulse {
        0%   { box-shadow: 0 0 0 0 rgba(151, 207, 130, 0.5); }
        70%  { box-shadow: 0 0 0 8px rgba(151, 207, 130, 0); }
        100% { box-shadow: 0 0 0 0 rgba(151, 207, 130, 0); }
    }

    #chat-messages {
        flex: 1;
        overflow-y: auto;
        overscroll-behavior: contain;
        padding: 16px 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: white;
        background-image: radial-gradient(rgba(184, 147, 95, 0.10) 1px, transparent 1.5px);
        background-size: 18px 18px;
        color: #000000;
        font-size: 13.5px;
    }
    #chat-messages::-webkit-scrollbar {
        width: 5px;
    }
    #chat-messages::-webkit-scrollbar-thumb {
        background: linear-gradient(#dcc9a8, #c9ae83);
        border-radius: 8px;
    }
    #chat-messages::-webkit-scrollbar-thumb:hover {
        background: #b8935f;
    }

    #chat-messages div {
        max-width: 80%;
        padding: 9px 13px 10px;
        border-radius: 15px;
        line-height: 1.55;
        overflow-wrap: break-word;
        box-shadow: 0 1px 2px rgba(20, 18, 15, 0.06);
    }

    #chat-messages div:last-child {
        animation: fzMsgIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    @keyframes fzMsgIn {
        from { opacity: 0; transform: translateY(10px) scale(0.96); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    #chat-messages div:nth-child(odd) {
        align-self: flex-end;
        background: linear-gradient(150deg, #26262a, #1c1c1e);
        color: white;
        border: 1px solid rgba(212, 175, 122, 0.28);
        border-bottom-right-radius: 5px;
    }

    #chat-messages div:nth-child(even) {
        align-self: flex-start;
        background: linear-gradient(135deg, #e7c894 0%, #d4af7a 45%, #b8935f 100%);
        color: black;
        border: 1px solid #ece3d2;
        border-bottom-left-radius: 5px;
    }

    #chat-messages div b {
        display: block;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 1.6px;
        text-transform: uppercase;
        margin-bottom: 3px;
        opacity: 0.75;
    }
    #chat-messages div:nth-child(odd) b  { color: white; }
    #chat-messages div:nth-child(even) b { color: black; }


    #chat-input {
        border: none;
        border-top: 1px solid #c18524;
        background: wheat;
        color: black;
        padding: 14px 16px;
        font-family: inherit;
        font-size: 13px;
        letter-spacing: 0.2px;
        outline: none;
        transition: background 0.25s ease, box-shadow 0.25s ease;
    }
    #chat-input::placeholder {
        color: #817c72;
    }


    #chat-send {
        position: relative;
        overflow: hidden;
        border: none;
        background: linear-gradient(135deg, #e7c894 0%, #d4af7a 45%, #b8935f 100%);
        color: #17171a;
        font-family: inherit;
        font-weight: 700;
        font-size: 11.5px;
        letter-spacing: 3px;
        text-transform: uppercase;
        padding: 14px;
        cursor: pointer;
        transition: letter-spacing 0.3s ease, filter 0.3s ease;
    }

    #chat-send::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 40%;
        height: 100%;
        background: linear-gradient(105deg, transparent, rgba(255, 255, 255, 0.5), transparent);
        transform: translateX(-130%) skewX(-18deg);
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
    }
    #chat-send:hover {
        letter-spacing: 4.5px;
        filter: brightness(1.05);
    }
    #chat-send:hover::after {
        transform: translateX(320%) skewX(-18deg);
    }
    #chat-send:active {
        filter: brightness(0.94);
    }


    @media (max-width: 420px) {
        #chat-window {
            width: calc(100vw - 24px);
            right: 12px;
            bottom: 90px;
            height: min(480px, calc(100dvh - 120px));
        }
        #chat-btn {
            right: 16px;
            bottom: 16px;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        #chat-btn,
        #chat-btn::before,
        #chat-window,
        #chat-window > *,
        #chat-messages div:last-child,
        #chat-header::after,
        #chat-send::after {
            animation: none !important;
            transition: none !important;
        }
        #chat-window {
            filter: none;
        }
    }`

document.head.appendChild(style)

const chatBtn = document.getElementById("chat-btn")
const chatWindow = document.getElementById("chat-window")
const chatMsg = document.getElementById("chat-messages")
const chatText = document.getElementById("chat-input")
const chatSend = document.getElementById("chat-send")

function beep(freqFrom, freqTo, duration, volume) {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = "sine"
    osc.frequency.setValueAtTime(freqFrom, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(freqTo, ctx.currentTime + duration)
    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.start()
    osc.stop(ctx.currentTime + duration)
}

function playPop() { beep(880, 220, 0.12, 0.25) }
function playSent() { beep(500, 850, 0.08, 0.15) }
function playArrived() {
    beep(660, 660, 0.1, 0.2)
    setTimeout(() => beep(880, 880, 0.15, 0.2), 90)
}

chatBtn.addEventListener('click', () => {
    const isOpen = chatWindow.classList.toggle("open")
    if(isOpen) playPop()
})

chatSend.addEventListener('click', async () => {

    const userText = chatText.value
    if(!userText) return

    chatMsg.innerHTML += `<div><b>You:</b> ${userText}</div>`
    chatText.value = ""
    playSent()

    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userText })
    })

    const data = await response.json()

    chatMsg.innerHTML += `<div><b>Foodiez:</b> ${data.reply}</div>`
    playArrived()
})