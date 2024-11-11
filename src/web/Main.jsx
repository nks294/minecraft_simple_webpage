import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import './css/style.css';
import Logo from './img/logo.svg';
import firefly from "./util/firefly";
import $ from 'jquery';

const backgroundImages = [
    require('./img/background00.png')
];

function Main() {

    const [playerCount, setPlayerCount] = useState(null);
    const [ip] = useState("yourdomain.com");
    const [backgroundImage, setBackgroundImage] = useState("");

    // 파티클 이펙트
    useEffect(() => {
        firefly();

        return () => {
            if ($.firefly && $.firefly.pause) {
                $.firefly.pause();
            }
        };
    }, []);

    // 배경이미지 랜덤 설정
    useEffect(() => {
        const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
        setBackgroundImage(randomImage);
    }, []);

    // 우클릭 차단
    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault();
        };
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        }
    }, []);

    // 접속중인 플레이어 수 업데이트
    useEffect(() => {
        const updatePlayerCount = async () => {
            try {
                const response = await fetch(`https://api.mcsrvstat.us/3/${ip}`);
                const result = await response.json();
                if (result.players) {
                    setPlayerCount(result.players.online);
                } else {
                    setPlayerCount("현재 오프라인 상태입니다.");
                }
            } catch (error) {
                setPlayerCount("불러오는데 실패했습니다.")
            }
        };

        updatePlayerCount();
        const interval = setInterval(updatePlayerCount, 60000);
        return () => clearInterval(interval);
    }, [ip]);

    return (
        <>
            <Helmet>
              <title>minecraft server website title</title>
              <meta name="description" content="minecraft server website title" />
              <meta property="og:title" content="minecraft server website title" />
              <meta property="og:site_name" content="minecraft server website title" />
              <meta property="og:description" content="minecraft server website title" />
            </Helmet>
            
            <div className="background"
                style={{
                  backgroundImage: `linear-gradient(#203940dd, #203940dd), url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
            >
                <div className="main-wrapper">
                    <Link to="yourwebsite.com" className="logo">
                        <img src={Logo} alt="Logo" />
                    </Link>

                    <div className="title-wrapper">
                        <h1 className="title">minecraft server website title</h1>
                        <h3 className="subtitle">minecraft server website subtitle</h3>

                        <p className="playercount">
                            {playerCount !== null ? ( 
                                <>
                                    현재 <span className="sip">{playerCount}</span> 명 접속중!
                                </>
                                ) : (
                                    "접속 정보 로드 중..."
                                )
                            }
                        </p>
                    </div>

                    <div className="items">
                        <a href="https://yourserver.com/map" className="item">
                            <i className="far fa-map"></i>
                            <span>
                                <p>웹 지도</p>
                            </span>
                        </a>
                        <Link to="/info" className="item">
                            <i className="far fa-book"></i>
                            <span>
                                <p>서버 가이드</p>
                            </span>
                        </Link>
                        <Link to="https://yourserver.com/download" className="item">
                            <i className="far fa-download"></i>
                            <span>
                                <p>간편 설치기</p>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;