"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Star, Sparkles, Volume2, VolumeX, Zap, Gift } from "lucide-react"
import Image from "next/image"

const encouragingMessages = [
  "Gửi Vy, nghe nói bạn đang có chút buồn bã, mình gửi bạn chút năng lượng tích cực nhé. Mong là mọi chuyện sẽ sớm ổn thôi. ✨",
  "Cuộc sống đôi khi có những nốt trầm, nhưng mình tin bạn đủ mạnh mẽ để vượt qua. Cứ từ từ và hít thở sâu nhé. 😌",
  "Dù hôm nay có thể chưa phải ngày đẹp nhất, hãy nhớ rằng bạn luôn có khả năng làm cho ngày mai tươi sáng hơn. ☀️",
  "Bạn là một người đáng mến và có rất nhiều điều tốt đẹp. Đừng để những nỗi buồn nhỏ bé làm lu mờ đi sự rạng rỡ đó. 💖",
  "Nếu có điều gì nặng lòng, hãy cứ cho phép bản thân được nghỉ ngơi một chút. Mọi thứ rồi sẽ ổn thôi. ☕",
  "Hi vọng bạn sẽ tìm được cách để những muộn phiền này tan biến nhanh chóng. 💨",
  "Không sao cả nếu đôi khi bạn cảm thấy yếu lòng. Điều quan trọng là biết đứng dậy và tiếp tục bước đi. Bạn làm được mà. 💪",
  "Hãy nhớ rằng bạn không đơn độc. Nếu cần một ai đó để nói chuyện, mình luôn ở đây. 🤗",
  "Mỗi ngày là một cơ hội mới để bạn tỏa sáng. Đừng bỏ cuộc và hãy tin vào bản thân mình nhé. 🌟",
  "Gửi bạn một cái ôm tinh thần thật chặt. Mong bạn sớm tìm lại được niềm vui và sự bình yên trong lòng. 🌈",
];

export default function LoveMessagePage() {
  // All useState declarations at the top
  const [showStartOverlay, setShowStartOverlay] = useState(true)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [typingText, setTypingText] = useState("")
  const [isTyping, setIsTyping] = useState(false) // Chỉ bắt đầu khi nhấn nút
  const [heartCount, setHeartCount] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([] as Array<{ id: number; x: number; y: number; color: string }>)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [rainbowMode, setRainbowMode] = useState(false)
  const [currentBg, setCurrentBg] = useState(0)
  const [isButtonPressed, setIsButtonPressed] = useState(false)
  const [loveVirus, setLoveVirus] = useState(false)
  const [virusHearts, setVirusHearts] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([] as Array<{ id: number; x: number; y: number; size: number; delay: number }>)
  const [screenGlitch, setScreenGlitch] = useState(false)
  const [effectIndex, setEffectIndex] = useState(0)
  const [spiralHearts, setSpiralHearts] = useState<Array<{ id: number; angle: number; radius: number; delay: number }>>([] as Array<{ id: number; angle: number; radius: number; delay: number }>)
  const [rainHearts, setRainHearts] = useState<Array<{ id: number; x: number; delay: number }>>([] as Array<{ id: number; x: number; delay: number }>)
  const [fireworkHearts, setFireworkHearts] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; delay: number }>>([] as Array<{ id: number; x: number; y: number; vx: number; vy: number; delay: number }>)
  const [portalEffect, setPortalEffect] = useState(false)
  const [gravityWave, setGravityWave] = useState(false)
  const [matrixRain, setMatrixRain] = useState<Array<{ id: number; x: number; speed: number; delay: number }>>([] as Array<{ id: number; x: number; speed: number; delay: number }>)
  const [dnaHelix, setDnaHelix] = useState<Array<{ id: number; angle: number; height: number; delay: number }>>([] as Array<{ id: number; angle: number; height: number; delay: number }>)
  const [quantumTunnel, setQuantumTunnel] = useState<Array<{ id: number; distance: number; angle: number; delay: number }>>([] as Array<{ id: number; distance: number; angle: number; delay: number }>)
  const [blackHole, setBlackHole] = useState<Array<{ id: number; angle: number; radius: number; delay: number }>>([] as Array<{ id: number; angle: number; radius: number; delay: number }>)
  const [constellation, setConstellation] = useState<Array<{ id: number; x: number; y: number; delay: number; connected: boolean }>>([] as Array<{ id: number; x: number; y: number; delay: number; connected: boolean }>)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Phát nhạc tự động khi vào trang nếu musicPlaying là true
  useEffect(() => {
    if (musicPlaying && audioRef.current) {
      audioRef.current.play()
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [musicPlaying])

  // Tự động bật nhạc khi vào trang lần đầu
  // Không tự động phát nhạc khi vào trang, chờ người dùng nhấn
  useEffect(() => {
    // Không làm gì ở đây, chỉ phát khi người dùng nhấn
  }, [])

  const backgrounds = [
    "from-pink-100 via-purple-50 to-blue-100",
    "from-yellow-100 via-pink-50 to-purple-100",
    "from-green-100 via-blue-50 to-indigo-100",
    "from-orange-100 via-red-50 to-pink-100",
    "from-indigo-100 via-purple-50 to-pink-100",
  ]

  // Typing effect (faster, with pause after full message)
  useEffect(() => {
    if (isTyping) {
      const message = encouragingMessages[currentMessage]
      let i = 0
      setTypingText("")
      const typing = setInterval(() => {
        if (i < message.length) {
          setTypingText(message.slice(0, i + 1))
          i++
        } else {
          clearInterval(typing)
          setIsTyping(false)
          // Pause for 1.2s after full message before advancing
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(() => {
              setCurrentMessage((prev) => (prev + 1) % encouragingMessages.length)
              setIsTyping(true)
              setIsVisible(true)
              setCurrentBg(Math.floor(Math.random() * backgrounds.length))
            }, 400)
          }, 1200)
        }
      }, 80) // Slower typing speed
      return () => clearInterval(typing)
    }
  }, [currentMessage, isTyping, backgrounds.length])

  // Particle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => [
        ...prev.slice(-10),
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: window.innerHeight,
          color: ["#ff69b4", "#ff1493", "#9370db", "#87ceeb", "#ffd700"][Math.floor(Math.random() * 5)],
        },
      ])
    }, 400)

    return () => clearInterval(interval)
  }, [])

  // Remove old particles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles((prev) => prev.filter((p) => Date.now() - p.id < 3000))
    }, 1000)
    return () => clearInterval(cleanup)
  }, [])

  // const nextMessage = () => {
  //   if (isChanging) return

  //   setIsChanging(true)
  //   setIsVisible(false)
  //   setTimeout(() => {
  //     setCurrentMessage((prev) => (prev + 1) % encouragingMessages.length)
  //     setIsTyping(true)
  //     setIsVisible(true)
  //     setTimeout(() => {
  //       setIsChanging(false)
  //     }, 2000)
  //   }, 300)
  // }

  // const prevMessage = () => {
  //   if (isChanging) return

  //   setIsChanging(true)
  //   setIsVisible(false)
  //   setTimeout(() => {
  //     setCurrentMessage((prev) => (prev - 1 + encouragingMessages.length) % encouragingMessages.length)
  //     setIsTyping(true)
  //     setIsVisible(true)
  //     setTimeout(() => {
  //       setIsChanging(false)
  //     }, 2000)
  //   }, 300)
  // }

  const handleMegaLove = () => {
    if (isButtonPressed) return

    setIsButtonPressed(true)
    setHeartCount((prev) => prev + 1)

    // Expanded effects array with new unique effects
    const effects = [
      () => createLoveVirus(),
      () => createHeartRain(),
      () => createSpiralGalaxy(),
      () => createFireworks(),
      () => createPortalEffect(),
      () => createGravityWave(),
      () => createMatrixRain(),
      () => createDNAHelix(),
      () => createQuantumTunnel(),
      () => createBlackHole(),
      () => createConstellation(),
    ]

    effects[effectIndex]()
    setEffectIndex((prev) => (prev + 1) % effects.length)

    // Enhanced vibrate patterns
    const vibratePatterns = [
      [200, 100, 200, 100, 300], // Virus
      [100, 50, 100, 50, 100, 50, 200], // Rain
      [300, 100, 300], // Spiral
      [50, 50, 50, 50, 50, 200], // Fireworks
      [400, 200, 400], // Portal
      [100, 100, 100, 100, 500], // Gravity
      [150, 75, 150, 75, 150, 75, 300], // Matrix
      [250, 125, 250, 125, 400], // DNA
      [300, 150, 300, 150, 300], // Quantum
      [400, 100, 400, 100, 600], // Black Hole
      [150, 100, 150, 100, 150, 100, 350], // Constellation
    ]

    if (navigator.vibrate) {
      navigator.vibrate(vibratePatterns[effectIndex])
    }

    setTimeout(() => {
      // Clear all effects
      setLoveVirus(false)
      setScreenGlitch(false)
      setVirusHearts([])
      setSpiralHearts([])
      setRainHearts([])
      setFireworkHearts([])
      setPortalEffect(false)
      setGravityWave(false)
      setMatrixRain([])
      setDnaHelix([])
      setQuantumTunnel([])
      setBlackHole([])
      setConstellation([])
      setIsButtonPressed(false)
    }, 4000)

    // Special surprise every 5 clicks
    if ((heartCount + 1) % 5 === 0) {
      setRainbowMode(true)
      setTimeout(() => {
        setRainbowMode(false)
      }, 2500)
    }
  }

  // Original effects
  const createLoveVirus = () => {
    setLoveVirus(true)
    setScreenGlitch(true)

    const virusPattern = []
    for (let wave = 0; wave < 5; wave++) {
      for (let i = 0; i < 8; i++) {
        const angle = (i * 45 * Math.PI) / 180
        const distance = (wave + 1) * 80
        virusPattern.push({
          id: Date.now() + wave * 8 + i,
          x: 50 + Math.cos(angle) * (distance / 4),
          y: 50 + Math.sin(angle) * (distance / 4),
          size: Math.random() * 30 + 20,
          delay: wave * 200 + i * 50,
        })
      }
    }
    setVirusHearts(virusPattern)
  }

  const createHeartRain = () => {
    const rainPattern = []
    for (let i = 0; i < 20; i++) {
      rainPattern.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        delay: i * 100,
      })
    }
    setRainHearts(rainPattern)
  }

  const createSpiralGalaxy = () => {
    const spiralPattern = []
    for (let i = 0; i < 30; i++) {
      spiralPattern.push({
        id: Date.now() + i,
        angle: i * 30,
        radius: i * 8,
        delay: i * 80,
      })
    }
    setSpiralHearts(spiralPattern)
  }

  const createFireworks = () => {
    const fireworkPattern = []
    for (let burst = 0; burst < 3; burst++) {
      for (let i = 0; i < 12; i++) {
        const angle = (i * 30 * Math.PI) / 180
        const speed = Math.random() * 3 + 2
        fireworkPattern.push({
          id: Date.now() + burst * 12 + i,
          x: 50 + Math.random() * 20 - 10,
          y: 50 + Math.random() * 20 - 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          delay: burst * 500 + i * 50,
        })
      }
    }
    setFireworkHearts(fireworkPattern)
  }

  const createPortalEffect = () => {
    setPortalEffect(true)
    setScreenGlitch(true)
  }

  const createGravityWave = () => {
    setGravityWave(true)
  }

  // New unique effects
  const createMatrixRain = () => {
    const matrixPattern = []
    for (let i = 0; i < 15; i++) {
      matrixPattern.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        speed: Math.random() * 2 + 1,
        delay: i * 100,
      })
    }
    setMatrixRain(matrixPattern)
  }

  const createDNAHelix = () => {
    const helixPattern = []
    for (let i = 0; i < 40; i++) {
      helixPattern.push({
        id: Date.now() + i,
        angle: i * 18,
        height: i * 5,
        delay: i * 60,
      })
    }
    setDnaHelix(helixPattern)
  }

  const createQuantumTunnel = () => {
    const tunnelPattern = []
    for (let ring = 0; ring < 8; ring++) {
      for (let i = 0; i < 12; i++) {
        tunnelPattern.push({
          id: Date.now() + ring * 12 + i,
          distance: ring * 30 + 50,
          angle: i * 30,
          delay: ring * 150 + i * 25,
        })
      }
    }
    setQuantumTunnel(tunnelPattern)
  }

  const createBlackHole = () => {
    const holePattern = []
    for (let spiral = 0; spiral < 50; spiral++) {
      holePattern.push({
        id: Date.now() + spiral,
        angle: spiral * 25,
        radius: Math.max(200 - spiral * 4, 10),
        delay: spiral * 40,
      })
    }
    setBlackHole(holePattern)
  }

  const createConstellation = () => {
    const starPattern: Array<{ id: number; x: number; y: number; delay: number; connected: boolean }> = []
    const positions = [
      { x: 20, y: 20 },
      { x: 80, y: 30 },
      { x: 60, y: 60 },
      { x: 30, y: 70 },
      { x: 70, y: 80 },
      { x: 40, y: 40 },
      { x: 85, y: 60 },
      { x: 15, y: 50 },
      { x: 50, y: 25 },
      { x: 25, y: 85 },
      { x: 75, y: 15 },
      { x: 90, y: 90 },
    ]

    positions.forEach((pos, i) => {
      starPattern.push({
        id: Date.now() + i,
        x: pos.x,
        y: pos.y,
        delay: i * 200,
        connected: i > 0,
      })
    })
    setConstellation(starPattern)
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
    setMusicPlaying(!musicPlaying)
  }

  const createHeartExplosion = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        setParticles((prev) => [
          ...prev,
          {
            id: Date.now() + i,
            x: x + (Math.random() - 0.5) * 100,
            y: y + (Math.random() - 0.5) * 100,
            color: "#ff1493",
          },
        ])
      }, i * 50)
    }
  }

  // Đặt useEffect này sau tất cả các useState
  // (di chuyển xuống dưới, sau toàn bộ khai báo useState)

  // useEffect(() => {
  //   if (showSurprise) {
  //     // Tạo 24 trái tim rơi random vị trí
  //     const hearts = Array.from({length:24}, (_,i) => ({
  //       id: Date.now()+i,
  //       x: Math.random()*100,
  //       delay: i*120+Math.random()*200
  //     }))
  //     setSurpriseHearts(hearts)
  //   } else {
  //     setSurpriseHearts([])
  //   }
  // }, [showSurprise])
  // Overlay bắt đầu trải nghiệm

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        backgrounds[currentBg]
      } px-1 pt-4 pb-2 sm:px-4 sm:pt-8 sm:pb-6 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-1000  ${
        rainbowMode ? "" : ""
      } ${screenGlitch ? "animate-pulse" : ""} `}
      style={{
        minHeight: "100dvh",
        background: "linear-gradient(135deg, #ffe0ec 0%, #e0e7ff 100%)",
      }}
    >
      {/* Top bar for heart counter and sound button - smaller size */}
      <div className="w-full flex flex-row items-center justify-between px-4 pt-4 sm:px-8 sm:pt-6 absolute top-0 left-0 z-50">
        <div className="flex items-center bg-white rounded-full px-5 py-2 shadow-lg min-w-[80px] min-h-[40px]">
          <span className="text-pink-500 text-2xl mr-1">💖</span>
          <span className="text-pink-500 text-lg font-bold">{heartCount}</span>
        </div>
        <button
          className="flex items-center justify-center bg-pink-400 hover:bg-pink-500 text-white rounded-full shadow-lg min-w-[40px] min-h-[40px]"
          onClick={toggleMusic}
          style={{ outline: "none", border: "none" }}
        >
          {musicPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      </div>
      {/* Overlay bắt đầu trải nghiệm */}
      {showStartOverlay && (
        <div className="fixed inset-0 z-[100] bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 flex flex-col items-center justify-center">
          <div className="flex flex-col align-center justify-center text-3xl px-10 font-bold text-pink-600 mb-8 animate-bounce">
            <span>Chào mừng đến với</span>
            <span>thế giới yêu thương!</span>
          </div>
          <div className="mb-6 flex justify-center">
            <Image
              src="/assets/mewmew.gif"
              alt="Mewmew gif"
              width={240}
              height={240}
              
              priority
            />
          </div>
          <Button
            className="bg-pink-500 hover:bg-pink-600 text-white text-xl px-10 py-8 rounded-full shadow-lg animate-pulse"
            onClick={() => {
              setMusicPlaying(true);
              if (audioRef.current) {
                audioRef.current.play();
              }
              setShowStartOverlay(false);
              setIsTyping(true); // Bắt đầu typing khi nhấn
            }}
          >
            Bắt đầu trải nghiệm 🤍
          </Button>
        </div>
      )}
      {/* Audio element phát nhạc */}
      <audio
        ref={audioRef}
        src="/assets/IfYou-BIGBANG.mp3"
        autoPlay
        loop
        style={{ display: "none" }}
      ></audio>

      {/* Love Virus Hearts */}
      {loveVirus && (
        <div className="absolute inset-0 pointer-events-none z-40">
          {virusHearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                fontSize: `${heart.size}px`,
                animationDelay: `${heart.delay}ms`,
                animation: `virusSpread 2s ease-out forwards, virusGlow 1s ease-in-out infinite alternate`,
              }}
            >
              💖
            </div>
          ))}
        </div>
      )}

      {/* Heart Rain Effect */}
      {rainHearts.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-40">
          {rainHearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute text-4xl"
              style={{
                left: `${heart.x}%`,
                top: "-10%",
                animationDelay: `${heart.delay}ms`,
                animation: `heartRain 2s ease-in forwards`,
              }}
            >
              💖
            </div>
          ))}
        </div>
      )}

      {/* Spiral Galaxy Effect */}
      {spiralHearts.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
          {spiralHearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute text-3xl"
              style={
                {
                  animationDelay: `${heart.delay}ms`,
                  animation: `spiralGalaxy 3s ease-out forwards`,
                  "--angle": `${heart.angle}deg`,
                  "--radius": `${heart.radius}px`,
                } as React.CSSProperties
              }
            >
              💖
            </div>
          ))}
        </div>
      )}

      {/* Fireworks Effect */}
      {fireworkHearts.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-40">
          {fireworkHearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute text-3xl"
              style={
                {
                  left: `${heart.x}%`,
                  top: `${heart.y}%`,
                  animationDelay: `${heart.delay}ms`,
                  animation: `fireworkBurst 2s ease-out forwards`,
                  "--vx": heart.vx,
                  "--vy": heart.vy,
                } as React.CSSProperties
              }
            >
              💖
            </div>
          ))}
        </div>
      )}

      {/* Portal Effect */}
      {portalEffect && (
        <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
          <div className="relative">
            <div className="w-32 h-32 border-8 border-pink-400 rounded-full animate-spin"></div>
            <div
              className="absolute inset-0 w-32 h-32 border-8 border-purple-400 rounded-full animate-spin"
              style={{ animationDirection: "reverse" }}
            ></div>
            <div className="absolute inset-4 w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl animate-bounce">💖</span>
            </div>
          </div>
        </div>
      )}

      {/* Gravity Wave Effect */}
      {gravityWave && (
        <div className="absolute inset-0 pointer-events-none z-40">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-200/30 to-transparent animate-pulse transform rotate-45"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-200/30 to-transparent animate-pulse transform -rotate-45 animation-delay-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-8xl animate-bounce">💖</div>
          </div>
        </div>
      )}

      {/* Matrix Rain Effect */}
      {matrixRain.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-40">
          {matrixRain.map((drop) => (
            <div
              key={drop.id}
              className="absolute text-2xl"
              style={{
                left: `${drop.x}%`,
                top: "-10%",
                animationDelay: `${drop.delay}ms`,
                animation: `matrixFall ${3 / drop.speed}s linear forwards`,
                color: "#ff1493",
              }}
            >
              💖💕💗💓💝
            </div>
          ))}
        </div>
      )}

      {/* DNA Helix Effect */}
      {dnaHelix.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
          {dnaHelix.map((strand) => (
            <div
              key={strand.id}
              className="absolute text-2xl"
              style={
                {
                  animationDelay: `${strand.delay}ms`,
                  animation: `dnaRotate 4s ease-in-out forwards`,
                  "--angle": `${strand.angle}deg`,
                  "--height": `${strand.height}px`,
                } as React.CSSProperties
              }
            >
              💖
            </div>
          ))}
        </div>
      )}

      {/* Quantum Tunnel Effect */}
      {quantumTunnel.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
          {quantumTunnel.map((particle) => (
            <div
              key={particle.id}
              className="absolute text-xl"
              style={
                {
                  animationDelay: `${particle.delay}ms`,
                  animation: `quantumTunnel 3s ease-out forwards`,
                  "--distance": `${particle.distance}px`,
                  "--angle": `${particle.angle}deg`,
                } as React.CSSProperties
              }
            >
              💖
            </div>
          ))}
        </div>
      )}

      {/* Black Hole Effect */}
      {blackHole.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
          <div className="absolute w-20 h-20 rounded-full"></div>
          {blackHole.map((particle) => (
            <div
              key={particle.id}
              className="absolute text-xl"
              style={
                {
                  animationDelay: `${particle.delay}ms`,
                  animation: `blackHoleSpiral 3s ease-in forwards`,
                  "--angle": `${particle.angle}deg`,
                  "--radius": `${particle.radius}px`,
                } as React.CSSProperties
              }
            >
              💖
            </div>
          ))}
        </div>
      )}

      {/* Constellation Effect */}
      {constellation.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-40">
          {constellation.map((star, index) => (
            <div key={star.id}>
              <div
                className="absolute text-3xl"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  animationDelay: `${star.delay}ms`,
                  animation: `starTwinkle 2s ease-in-out infinite`,
                }}
              >
                ⭐
              </div>
              {star.connected && index > 0 && (
                <div
                  className="absolute border-t-2 border-yellow-400/50"
                  style={{
                    left: `${Math.min(star.x, constellation[index - 1].x)}%`,
                    top: `${Math.min(star.y, constellation[index - 1].y)}%`,
                    width: `${Math.abs(star.x - constellation[index - 1].x)}%`,
                    transformOrigin: "left",
                    transform: `rotate(${
                      (Math.atan2(
                        constellation[index - 1].y - star.y,
                        constellation[index - 1].x - star.x
                      ) *
                        180) /
                      Math.PI
                    }deg)`,
                    animationDelay: `${star.delay + 500}ms`,
                    animation: `fadeIn 1s ease-in forwards`,
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none animate-bounce"
          style={{
            left: particle.x,
            top: particle.y,
            color: particle.color,
            animation: `float 3s ease-out forwards`,
          }}
        >
          <Heart className="w-6 h-6 fill-current" />
        </div>
      ))}

      

      <Card
        className={`w-full max-w-md mx-auto bg-white/95 backdrop-blur-lg shadow-2xl border border-gray-100 rounded-[40px] overflow-hidden transform hover:scale-105 transition-transform duration-300 ${
          loveVirus ? "animate-pulse border-4 border-pink-400" : ""
        }`}
        style={{
          width: "100%",
          maxWidth: "410px",
          minWidth: "0",
          marginTop: "0",
          marginBottom: "0",
          boxShadow:
            "0 12px 40px rgba(236,72,153,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        {/* Header with animated photo */}
        <div
          className={`relative px-3 pt-12 pb-8 sm:p-8 bg-gradient-to-r ${
            rainbowMode
              ? "from-red-200 via-yellow-200 via-green-200 via-blue-200 to-purple-200 animate-pulse"
              : "from-pink-200 to-purple-200"
          } ${loveVirus ? "animate-bounce" : ""}`}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="relative" onClick={createHeartExplosion}>
              <div
                className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl cursor-pointer transform hover:scale-105 transition-transform ${
                  rainbowMode ? "animate-spin" : "hover:rotate-12"
                } ${loveVirus ? "animate-pulse border-pink-400" : ""}`}
                style={{
                  minWidth: "128px",
                  minHeight: "128px",
                  background: "#fff",
                  boxShadow: "0 6px 24px rgba(168,85,247,0.12)",
                  border: "4px solid #fff",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "9999px",
                    padding: "2px",
                    background:
                      "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
                    zIndex: 1,
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    inset: 4,
                    borderRadius: "9999px",
                    overflow: "hidden",
                    zIndex: 2,
                  }}
                >
                  <Image
                    src="/assets/friend-photo.png"
                    alt="Your beautiful friend"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover rounded-full"
                    style={{
                      aspectRatio: "1/1",
                      objectFit: "cover",
                      borderRadius: "9999px",
                    }}
                    sizes="(max-width: 640px) 128px, 144px"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center animate-bounce">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <div
                className={`absolute -top-4 -left-4 animate-bounce delay-300 ${
                  loveVirus ? "text-2xl" : ""
                }`}
              >
                {loveVirus ? (
                  "💖"
                ) : (
                  <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
                )}
              </div>
              <div
                className={`absolute -bottom-4 -right-4 animate-bounce delay-700 ${
                  loveVirus ? "text-2xl" : ""
                }`}
              >
                {loveVirus ? (
                  "💕"
                ) : (
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                )}
              </div>
            </div>
            <h1
              className={`text-xl font-bold text-gray-700 text-center ${
                rainbowMode
                  ? "animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
                  : ""
              } ${loveVirus ? "animate-bounce" : ""}`}
            >
              Dành cho Nhật Vy 💕✨
            </h1>
          </div>
        </div>

        {/* Message area with typing effect */}
        <div
          className={`px-2 py-4 sm:p-8 min-h-[120px] sm:min-h-[200px] flex items-center justify-center relative ${
            loveVirus ? "animate-pulse" : ""
          }`}
        >
          <div
            className={`text-center transition-all duration-500 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <p
              className={`text-lg text-gray-700 leading-relaxed font-medium px-2 ${
                rainbowMode
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                  : ""
              }`}
            >
              {isTyping ? typingText : encouragingMessages[currentMessage]}
              {isTyping && <span className="animate-pulse">|</span>}
            </p>
          </div>

          <div
            className={`absolute top-4 left-4 animate-bounce ${
              loveVirus ? "text-xl" : ""
            }`}
          >
            {loveVirus ? (
              "💖"
            ) : (
              <Heart className="w-3 h-3 text-pink-300 fill-pink-300" />
            )}
          </div>
          <div
            className={`absolute bottom-4 right-4 animate-bounce delay-500 ${
              loveVirus ? "text-xl" : ""
            }`}
          >
            {loveVirus ? (
              "💕"
            ) : (
              <Sparkles className="w-3 h-3 text-purple-300 fill-purple-300" />
            )}
          </div>
        </div>

        {/* Enhanced controls */}
        <div className="px-2 sm:px-6 pt-0 pb-2 space-y-3">
          {/* Indicator dots for messages */}
          <div className="flex justify-center items-center py-2">
            <div className="flex space-x-1">
              {encouragingMessages.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentMessage
                      ? "bg-gradient-to-r from-pink-400 to-purple-400 scale-125"
                      : "bg-gray-200 hover:bg-gray-300"
                  } ${loveVirus ? "animate-pulse" : ""}`}
                />
              ))}
            </div>
          </div>

          {/* Mega love button */}
          <div className="w-full flex flex-col items-center justify-center py-2">
            <Button
              onClick={handleMegaLove}
              disabled={isButtonPressed}
              className="w-full max-w-[340px] bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white rounded-[40px] py-6 text-2xl font-black shadow-[0_0_32px_0_rgba(236,72,153,0.25),0_4px_32px_rgba(168,85,247,0.18)] hover:scale-110 hover:shadow-[0_0_48px_0_rgba(236,72,153,0.35),0_8px_48px_rgba(168,85,247,0.28)] transition-all duration-300 flex items-center justify-center gap-4 animate-gradient-x overflow-hidden"
              style={{
                fontWeight: 900,
                letterSpacing: "0.06em",
                boxShadow:
                  "0 0 32px 0 rgba(236,72,153,0.25), 0 4px 32px rgba(168,85,247,0.18)",
              }}
            >
              <Zap className="w-7 h-7 fill-white animate-spin-slow" />
              <span className="tracking-wide drop-shadow-lg animate-pulse">
                MEGA YÊU THƯƠNG!
              </span>
              <Gift className="w-7 h-7 animate-bounce" />
            </Button>
            <div className="w-full flex justify-center mt-6">
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-base text-gray-500 font-semibold">
                <span>💕 {heartCount} lần yêu thương</span>
                {/* <span>✨ {Math.floor(heartCount / 5)} phép màu</span> */}
              </div>
            </div>
          </div>
        </div>

        {/* Footer with animated message */}
        <div className="px-2 sm:px-6 pb-8 sm:pb-6 mt-2">
          <p
            className={`text-center text-sm text-gray-500 italic animate-pulse ${
              rainbowMode
                ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
                : ""
            } ${loveVirus ? "animate-bounce" : ""}`}
          >
            &quot;Anh sẽ luôn là siêu anh hùng của em&quot; 🧛✨
          </p>
        </div>
      </Card>

      <style jsx>{`
        .surprise-magic-bg {
          background: linear-gradient(120deg,#fce7f3 0%,#e0e7ff 50%,#f3e8ff 100%);
          animation: magicBg 2.5s ease-in-out;
        }
        @keyframes magicBg {
          0% { filter: brightness(1.1) saturate(1.2); }
          50% { filter: brightness(1.3) saturate(1.5); }
          100% { filter: brightness(1.1) saturate(1.2); }
        }
        .magic-heart {
          position: absolute;
          opacity: 0.85;
          filter: drop-shadow(0 0 8px #f472b6);
        }
        @keyframes heartDrop {
          0% { transform: translateY(0) scale(0.7); opacity:0.7; }
          70% { opacity:1; }
          100% { transform: translateY(90vh) scale(1.2); opacity:0; }
        }
        .magic-gradient {
          background: linear-gradient(90deg,#f472b6,#a78bfa,#fbbf24,#34d399,#f472b6);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: magicGradient 3.5s linear infinite;
        }
        @keyframes magicGradient {
          0% { background-position:0% 50%; }
          50% { background-position:100% 50%; }
          100% { background-position:0% 50%; }
        }
        .magic-jump {
          animation: magicJump 1.2s cubic-bezier(.5,1.5,.5,1) infinite alternate;
        }
        @keyframes magicJump {
          0% { transform: scale(1) translateY(0); }
          60% { transform: scale(1.08) translateY(-12px); }
          100% { transform: scale(1) translateY(0); }
        }
        .animate-gradient-x {
        .surprise-fade {
          animation: surpriseFade 1.2s cubic-bezier(0.4,0,0.2,1);
        }
        .surprise-glow {
          animation: surpriseGlow 2.5s ease-in-out infinite alternate;
          text-shadow: 0 0 24px #f472b6, 0 0 48px #a78bfa;
        }
        @keyframes surpriseFade {
          0% { opacity: 0; transform: scale(0.7); }
          60% { opacity: 1; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes surpriseGlow {
          0% { text-shadow: 0 0 12px #f472b6, 0 0 24px #a78bfa; }
          100% { text-shadow: 0 0 32px #f472b6, 0 0 64px #a78bfa; }
        }
          background-size: 200% 200%;
          animation: gradient-x 3s ease-in-out infinite;
        }
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-spin-slow {
          animation: spin 2.5s linear infinite;
        }
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-200px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes virusSpread {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(360deg);
            opacity: 0.8;
          }
        }

        @keyframes virusGlow {
          0% {
            filter: drop-shadow(0 0 5px #ff1493);
            transform: scale(1);
          }
          100% {
            filter: drop-shadow(0 0 20px #ff69b4);
            transform: scale(1.1);
          }
        }

        @keyframes heartRain {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes spiralGalaxy {
          0% {
            transform: rotate(var(--angle)) translateX(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: rotate(calc(var(--angle) + 720deg))
              translateX(var(--radius)) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes fireworkBurst {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(
                calc(var(--vx) * 100px),
                calc(var(--vy) * 100px)
              )
              scale(1);
            opacity: 0;
          }
        }

        @keyframes matrixFall {
          0% {
            transform: translateY(-10vh);
            opacity: 1;
          }
          100% {
            transform: translateY(120vh);
            opacity: 0;
          }
        }

        @keyframes dnaRotate {
          0% {
            transform: rotate(var(--angle)) translateX(50px)
              translateY(calc(var(--height) * -1px));
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: rotate(calc(var(--angle) + 360deg)) translateX(50px)
              translateY(var(--height));
            opacity: 0;
          }
        }

        @keyframes quantumTunnel {
          0% {
            transform: rotate(var(--angle)) translateX(var(--distance)) scale(0);
            opacity: 1;
          }
          100% {
            transform: rotate(calc(var(--angle) + 180deg)) translateX(0)
              scale(1);
            opacity: 0;
          }
        }

        @keyframes blackHoleSpiral {
          0% {
            transform: rotate(var(--angle)) translateX(var(--radius)) scale(1);
            opacity: 1;
          }
          100% {
            transform: rotate(calc(var(--angle) + 720deg)) translateX(0)
              scale(0);
            opacity: 0;
          }
        }

        @keyframes starTwinkle {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.6;
          }
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </div>
  );
}
