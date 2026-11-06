// Site copy for each language. App entries are keyed by the id used in js/app.js.
// App facts come from each app homepage and its Google Play listing.
const translations = {
  "en": {
    "siteTitle": "J’s Apps",
    "title": "Small apps\nfor everyday life",
    "intro": "Find an app that interests you and learn more on its homepage.",
    "all": "All",
    "filterLabel": "Filter by group",
    "visit": "App homepage",
    "newWindow": "(opens in a new window)",
    "languageLabel": "Select language",
    "footer": "Different apps. A place to find them all.",
    "groups": {
      "learn": "Learn & explore",
      "phone": "Phone",
      "calc": "Calculators"
    },
    "apps": {
      "phonebanner": {
        "name": "Phone LED Board",
        "tag": "Cheers · LED messages",
        "desc": "Turn your phone into a cheering LED board with custom text, colors and motion."
      },
      "phonespec": {
        "name": "Phone Spec",
        "tag": "Smartphones · Comparisons",
        "desc": "Search smartphones and compare their sizes and key specifications side by side."
      },
      "resistorcalculator": {
        "name": "Resistor Calculator",
        "tag": "Electronics · Calculations",
        "desc": "Decode color bands and SMD codes, calculate circuits and find resistor combinations."
      },
      "arthistorynote": {
        "name": "Art History Note",
        "tag": "Art · Explore and collect",
        "desc": "Explore Western art movements, artists and works, with museum information and visit notes."
      },
      "koreanstudy": {
        "name": "Korean Study",
        "tag": "Language learning · Korean",
        "desc": "Learn Korean from Hangul stroke order to everyday words and real-life conversations."
      },
      "snapstudy_cbible": {
        "name": "Catholic Bible Quiz",
        "tag": "Bible · Daily quiz",
        "desc": "Learn the Catholic Bible with daily quizzes, verse references, explanations and a mistakes notebook."
      },
      "phonecheck": {
        "name": "PhoneCheck",
        "tag": "Phone · Diagnostics",
        "desc": "Check your phone's sensors, screen, sound, battery, camera and network, then compare results over time."
      },
      "wifideadzone": {
        "name": "WiFi DeadZone",
        "tag": "Wi-Fi · Signal check",
        "desc": "Measure Wi-Fi signal in each room and spot dead zones by color on your floor plan, then compare before and after moving your router."
      },
      "stockcalculator": {
        "name": "Stock Trade Calculator",
        "tag": "Stocks · Calculators",
        "desc": "Calculate your average cost after buying more, trade returns, target sell prices and stop-loss prices, with fees and taxes included."
      }
    }
  },
  "ko": {
    "siteTitle": "J's 앱 소개",
    "title": "일상을 돕는\n작은 앱들",
    "intro": "관심 가는 앱을 골라 각 앱의 홈페이지에서 자세히 살펴보세요.",
    "all": "전체",
    "filterLabel": "그룹별로 보기",
    "visit": "앱 홈페이지",
    "newWindow": "(새 창에서 열기)",
    "languageLabel": "언어 선택",
    "footer": "각자의 쓰임을 가진 앱들, 하나의 공간에서.",
    "groups": {
      "learn": "배움과 탐구",
      "phone": "휴대폰",
      "calc": "계산 도구"
    },
    "apps": {
      "phonebanner": {
        "name": "폰전광판",
        "tag": "응원 · LED 메시지",
        "desc": "문구와 색상, 움직임을 꾸며 휴대폰을 응원용 LED 전광판으로 바꿔보세요."
      },
      "phonespec": {
        "name": "폰스펙",
        "tag": "스마트폰 · 사양 비교",
        "desc": "스마트폰을 검색하고 크기와 주요 사양을 나란히 비교해보세요."
      },
      "resistorcalculator": {
        "name": "저항계산기",
        "tag": "전자회로 · 계산 도구",
        "desc": "색띠와 SMD 코드를 읽고, 회로 계산부터 보유 저항 조합 찾기까지."
      },
      "arthistorynote": {
        "name": "미술사노트",
        "tag": "미술 · 탐색과 기록",
        "desc": "서양 미술사의 사조·작가·작품을 탐색하고, 소장 미술관과 관람노트를 살펴보세요."
      },
      "koreanstudy": {
        "name": "한국어 학습",
        "tag": "언어 학습 · 한글과 회화",
        "desc": "획순 따라쓰기로 한글을 익히고, 생활 단어와 10가지 상황별 회화까지 차근차근 배워보세요."
      },
      "snapstudy_cbible": {
        "name": "가톨릭 성경 퀴즈",
        "tag": "성경 · 매일 퀴즈",
        "desc": "매일 퀴즈로 가톨릭 성경을 익히고, 구절 출처와 해설, 오답노트로 복습하세요."
      },
      "phonecheck": {
        "name": "폰체크",
        "tag": "휴대폰 · 기능 점검",
        "desc": "센서, 화면·터치, 소리·진동, 배터리, 카메라, 네트워크를 점검하고 결과를 기록해 비교하세요."
      },
      "wifideadzone": {
        "name": "와이파이 사각지대 찾기",
        "tag": "와이파이 · 신호 진단",
        "desc": "방마다 와이파이 신호를 재고, 평면도 위에서 사각지대를 색으로 찾아보세요. 공유기를 옮긴 뒤 전후 비교도 가능합니다."
      },
      "stockcalculator": {
        "name": "주식 매매 계산기",
        "tag": "주식 · 계산 도구",
        "desc": "물타기 평균 단가, 매매 수익률, 목표 매도가, 손절 가격을 수수료와 세금까지 반영해 계산합니다."
      }
    }
  },
  "vi": {
    "siteTitle": "Ứng dụng của J",
    "title": "Những ứng dụng nhỏ\ncho cuộc sống hằng ngày",
    "intro": "Chọn ứng dụng bạn quan tâm và xem chi tiết trên trang chủ của ứng dụng.",
    "all": "Tất cả",
    "filterLabel": "Lọc theo nhóm",
    "visit": "Trang chủ ứng dụng",
    "newWindow": "(mở trong cửa sổ mới)",
    "languageLabel": "Chọn ngôn ngữ",
    "footer": "Nhiều ứng dụng. Một nơi để khám phá.",
    "groups": {
      "learn": "Học tập & khám phá",
      "phone": "Điện thoại",
      "calc": "Công cụ tính toán"
    },
    "apps": {
      "phonebanner": {
        "name": "Bảng LED điện thoại",
        "tag": "Cổ vũ · Lời nhắn LED",
        "desc": "Biến điện thoại thành bảng LED cổ vũ với lời nhắn, màu sắc và chuyển động tùy chỉnh."
      },
      "phonespec": {
        "name": "Phone Spec",
        "tag": "Điện thoại · So sánh",
        "desc": "Tìm điện thoại và so sánh kích thước cùng thông số kỹ thuật cạnh nhau."
      },
      "resistorcalculator": {
        "name": "Máy tính điện trở",
        "tag": "Điện tử · Tính toán",
        "desc": "Đọc vòng màu, mã SMD, tính mạch điện và tìm cách kết hợp các điện trở."
      },
      "arthistorynote": {
        "name": "Ghi chú lịch sử mỹ thuật",
        "tag": "Mỹ thuật · Khám phá và ghi chép",
        "desc": "Khám phá trào lưu, họa sĩ, tác phẩm phương Tây, bảo tàng và ghi chú tham quan."
      },
      "koreanstudy": {
        "name": "Học tiếng Hàn",
        "tag": "Học ngôn ngữ · Tiếng Hàn",
        "desc": "Học tiếng Hàn từ nét viết Hangul đến từ vựng đời thường và hội thoại thực tế."
      },
      "snapstudy_cbible": {
        "name": "Đố vui Kinh Thánh Công giáo",
        "tag": "Kinh Thánh · Đố vui hằng ngày",
        "desc": "Học Kinh Thánh Công giáo qua câu đố mỗi ngày, có chú thích chương – câu, giải thích và sổ câu sai."
      },
      "phonecheck": {
        "name": "PhoneCheck",
        "tag": "Điện thoại · Kiểm tra",
        "desc": "Kiểm tra cảm biến, màn hình, âm thanh, pin, camera và mạng của điện thoại, rồi so sánh kết quả theo thời gian."
      },
      "wifideadzone": {
        "name": "WiFi DeadZone",
        "tag": "Wi-Fi · Kiểm tra tín hiệu",
        "desc": "Đo tín hiệu Wi-Fi từng phòng, tìm vùng sóng yếu bằng màu trên sơ đồ nhà và so sánh trước – sau khi dời router."
      },
      "stockcalculator": {
        "name": "Máy tính giao dịch cổ phiếu",
        "tag": "Cổ phiếu · Công cụ tính",
        "desc": "Tính giá vốn trung bình khi mua thêm, lợi suất giao dịch, giá bán mục tiêu và giá cắt lỗ, có tính cả phí và thuế."
      }
    }
  },
  "id": {
    "siteTitle": "Aplikasi J",
    "title": "Aplikasi kecil\nuntuk keseharian",
    "intro": "Pilih aplikasi yang menarik dan lihat selengkapnya di halaman aplikasinya.",
    "all": "Semua",
    "filterLabel": "Saring menurut grup",
    "visit": "Situs aplikasi",
    "newWindow": "(dibuka di jendela baru)",
    "languageLabel": "Pilih bahasa",
    "footer": "Beragam aplikasi, satu tempat untuk menemukannya.",
    "groups": {
      "learn": "Belajar & jelajah",
      "phone": "Ponsel",
      "calc": "Alat hitung"
    },
    "apps": {
      "phonebanner": {
        "name": "Papan LED Ponsel",
        "tag": "Dukungan · Pesan LED",
        "desc": "Ubah ponsel menjadi papan LED dengan teks, warna, dan gerakan pilihan Anda."
      },
      "phonespec": {
        "name": "Spesifikasi Ponsel",
        "tag": "Ponsel · Perbandingan",
        "desc": "Cari ponsel dan bandingkan ukuran serta spesifikasi utamanya secara berdampingan."
      },
      "resistorcalculator": {
        "name": "Kalkulator Resistor",
        "tag": "Elektronika · Perhitungan",
        "desc": "Baca gelang warna dan kode SMD, hitung rangkaian, dan temukan kombinasi resistor."
      },
      "arthistorynote": {
        "name": "Catatan Sejarah Seni",
        "tag": "Seni · Jelajah dan catatan",
        "desc": "Jelajahi aliran, seniman, dan karya seni Barat, beserta informasi museum dan catatan kunjungan."
      },
      "koreanstudy": {
        "name": "Belajar Bahasa Korea",
        "tag": "Belajar bahasa · Korea",
        "desc": "Belajar bahasa Korea dari urutan goresan Hangul hingga kosakata sehari-hari dan percakapan nyata."
      },
      "snapstudy_cbible": {
        "name": "Kuis Alkitab Katolik",
        "tag": "Alkitab · Kuis harian",
        "desc": "Pelajari Alkitab Katolik lewat kuis harian, lengkap dengan rujukan pasal-ayat, penjelasan, dan catatan jawaban salah."
      },
      "phonecheck": {
        "name": "PhoneCheck",
        "tag": "Ponsel · Pemeriksaan",
        "desc": "Periksa sensor, layar, suara, baterai, kamera, dan jaringan ponsel Anda, lalu bandingkan hasilnya dari waktu ke waktu."
      },
      "wifideadzone": {
        "name": "WiFi DeadZone",
        "tag": "Wi-Fi · Cek sinyal",
        "desc": "Ukur sinyal Wi-Fi di setiap ruangan, temukan titik mati lewat warna pada denah, lalu bandingkan sebelum dan sesudah memindahkan router."
      },
      "stockcalculator": {
        "name": "Kalkulator Perdagangan Saham",
        "tag": "Saham · Alat hitung",
        "desc": "Hitung harga rata-rata setelah beli tambahan, imbal hasil transaksi, harga jual target, dan harga stop-loss, lengkap dengan biaya dan pajak."
      }
    }
  },
  "es": {
    "siteTitle": "Apps de J",
    "title": "Pequeñas apps\npara el día a día",
    "intro": "Elige la app que te interese y descubre más en su página.",
    "all": "Todas",
    "filterLabel": "Filtrar por grupo",
    "visit": "Sitio web de la app",
    "newWindow": "(se abre en una ventana nueva)",
    "languageLabel": "Seleccionar idioma",
    "footer": "Apps con distintos propósitos, en un solo lugar.",
    "groups": {
      "learn": "Aprender y explorar",
      "phone": "Teléfono",
      "calc": "Calculadoras"
    },
    "apps": {
      "phonebanner": {
        "name": "Letrero LED",
        "tag": "Apoyo · Mensajes LED",
        "desc": "Convierte tu teléfono en un letrero LED con texto, colores y movimiento a tu gusto."
      },
      "phonespec": {
        "name": "Comparador de teléfonos",
        "tag": "Teléfonos · Comparación",
        "desc": "Busca teléfonos y compara su tamaño y sus especificaciones principales lado a lado."
      },
      "resistorcalculator": {
        "name": "Calculadora de resistencias",
        "tag": "Electrónica · Cálculos",
        "desc": "Lee bandas de colores y códigos SMD, calcula circuitos y encuentra combinaciones de resistencias."
      },
      "arthistorynote": {
        "name": "Notas de historia del arte",
        "tag": "Arte · Explora y anota",
        "desc": "Explora movimientos, artistas y obras del arte occidental, con museos y notas de visita."
      },
      "koreanstudy": {
        "name": "Aprende coreano",
        "tag": "Idiomas · Coreano",
        "desc": "Aprende coreano desde el orden de los trazos del hangul hasta el vocabulario cotidiano y conversaciones reales."
      },
      "snapstudy_cbible": {
        "name": "Quiz de la Biblia católica",
        "tag": "Biblia · Quiz diario",
        "desc": "Conoce la Biblia católica con quizzes diarios, citas de capítulo y versículo, explicaciones y un cuaderno de errores."
      },
      "phonecheck": {
        "name": "PhoneCheck",
        "tag": "Teléfono · Diagnóstico",
        "desc": "Revisa los sensores, la pantalla, el sonido, la batería, la cámara y la red de tu teléfono, y compara los resultados."
      },
      "wifideadzone": {
        "name": "WiFi DeadZone",
        "tag": "Wi-Fi · Diagnóstico de señal",
        "desc": "Mide la señal Wi-Fi de cada habitación, detecta las zonas sin cobertura por colores en el plano y compara antes y después de mover el router."
      },
      "stockcalculator": {
        "name": "Calculadora de operaciones bursátiles",
        "tag": "Bolsa · Calculadoras",
        "desc": "Calcula el precio medio tras comprar más, la rentabilidad de tus operaciones, el precio de venta objetivo y el stop loss, con comisiones e impuestos."
      }
    }
  },
  "pt": {
    "siteTitle": "Apps de J",
    "title": "Pequenos apps\npara o dia a dia",
    "intro": "Escolha o app que lhe interessa e saiba mais na página dele.",
    "all": "Todos",
    "filterLabel": "Filtrar por grupo",
    "visit": "Site do app",
    "newWindow": "(abre em nova janela)",
    "languageLabel": "Selecionar idioma",
    "footer": "Apps com diferentes propostas, em um só lugar.",
    "groups": {
      "learn": "Aprender e explorar",
      "phone": "Telefone",
      "calc": "Calculadoras"
    },
    "apps": {
      "phonebanner": {
        "name": "Painel LED",
        "tag": "Apoio · Mensagens LED",
        "desc": "Transforme o smartphone num painel LED com texto, cores e movimento personalizados."
      },
      "phonespec": {
        "name": "Comparador de smartphones",
        "tag": "Smartphones · Comparação",
        "desc": "Pesquise smartphones e compare as dimensões e as principais especificações lado a lado."
      },
      "resistorcalculator": {
        "name": "Calculadora de resistências",
        "tag": "Circuitos · Cálculos",
        "desc": "Leia códigos de cores e SMD, calcule circuitos e encontre combinações de resistências."
      },
      "arthistorynote": {
        "name": "Notas de história da arte",
        "tag": "Arte · Exploração e notas",
        "desc": "Explore movimentos, artistas e obras da arte ocidental, com informações sobre museus e notas de visita."
      },
      "koreanstudy": {
        "name": "Aprender coreano",
        "tag": "Idiomas · Coreano",
        "desc": "Aprenda coreano da ordem dos traços do hangul ao vocabulário do dia a dia e a conversas reais."
      },
      "snapstudy_cbible": {
        "name": "Quiz da Bíblia Católica",
        "tag": "Bíblia · Quiz diário",
        "desc": "Conheça a Bíblia Católica com quizzes diários, referências de capítulo e versículo, explicações e caderno de erros."
      },
      "phonecheck": {
        "name": "PhoneCheck",
        "tag": "Smartphones · Diagnóstico",
        "desc": "Verifique sensores, display, som, bateria, câmera e rede do seu smartphone e compare os resultados ao longo do tempo."
      },
      "wifideadzone": {
        "name": "WiFi DeadZone",
        "tag": "Wi-Fi · Diagnóstico de sinal",
        "desc": "Meça o sinal de Wi-Fi em cada ambiente, encontre zonas sem sinal por cores na planta e compare antes e depois de mover o router."
      },
      "stockcalculator": {
        "name": "Calculadora de negociação de ações",
        "tag": "Ações · Calculadoras",
        "desc": "Calcule o preço médio após comprar mais, o retorno das operações, o preço de venda alvo e o stop loss, incluindo taxas e impostos."
      }
    }
  },
  "zh-hans": {
    "siteTitle": "J 的应用介绍",
    "title": "为日常而做的\n小应用",
    "intro": "选择感兴趣的应用，前往其主页了解更多。",
    "all": "全部",
    "filterLabel": "按分组筛选",
    "visit": "应用网站",
    "newWindow": "（在新窗口打开）",
    "languageLabel": "选择语言",
    "footer": "用途各异的应用，汇聚一处。",
    "groups": {
      "learn": "学习与探索",
      "phone": "手机",
      "calc": "计算工具"
    },
    "apps": {
      "phonebanner": {
        "name": "手机LED字幕",
        "tag": "应援 · LED消息",
        "desc": "自定义文字、颜色和滚动效果，把手机变成应援LED字幕屏。"
      },
      "phonespec": {
        "name": "手机参数对比",
        "tag": "智能手机 · 参数对比",
        "desc": "搜索智能手机，并排比较机身尺寸与主要参数。"
      },
      "resistorcalculator": {
        "name": "电阻计算器",
        "tag": "电子电路 · 计算工具",
        "desc": "识别色环与SMD代码，计算电路并查找电阻组合。"
      },
      "arthistorynote": {
        "name": "艺术史笔记",
        "tag": "艺术 · 探索与记录",
        "desc": "探索西方艺术流派、艺术家与作品，查看收藏博物馆并记录参观。"
      },
      "koreanstudy": {
        "name": "韩语学习",
        "tag": "语言学习 · 韩语",
        "desc": "从韩文笔顺到日常词汇和情景会话，循序渐进学习韩语。"
      },
      "snapstudy_cbible": {
        "name": "天主教圣经问答",
        "tag": "圣经 · 每日问答",
        "desc": "通过每日问答熟悉天主教圣经，附章节出处、解析和错题本。"
      },
      "phonecheck": {
        "name": "PhoneCheck",
        "tag": "手机 · 检测",
        "desc": "检测手机的传感器、屏幕、声音、电池、摄像头和网络，并记录结果以便对比。"
      },
      "wifideadzone": {
        "name": "WiFi DeadZone",
        "tag": "Wi‑Fi · 信号检测",
        "desc": "逐个房间测量 Wi‑Fi 信号，在平面图上用颜色找出信号盲区，并对比移动路由器前后的变化。"
      },
      "stockcalculator": {
        "name": "股票买卖计算器",
        "tag": "股票 · 计算工具",
        "desc": "计算加仓后的平均成本、交易收益率、目标卖出价和止损价，并计入手续费和税费。"
      }
    }
  },
  "zh-hant": {
    "siteTitle": "J 的應用程式介紹",
    "title": "為日常而做的\n小應用程式",
    "intro": "選擇感興趣的應用程式，前往其首頁了解更多。",
    "all": "全部",
    "filterLabel": "依群組篩選",
    "visit": "應用程式網站",
    "newWindow": "（在新視窗開啟）",
    "languageLabel": "選擇語言",
    "footer": "用途各異的應用程式，匯聚一處。",
    "groups": {
      "learn": "學習與探索",
      "phone": "手機",
      "calc": "計算工具"
    },
    "apps": {
      "phonebanner": {
        "name": "手機LED字幕",
        "tag": "應援 · LED訊息",
        "desc": "自訂文字、顏色和捲動效果，把手機變成應援LED字幕螢幕。"
      },
      "phonespec": {
        "name": "手機規格比較",
        "tag": "智慧型手機 · 規格比較",
        "desc": "搜尋智慧型手機，並排比較機身尺寸與主要規格。"
      },
      "resistorcalculator": {
        "name": "電阻計算機",
        "tag": "電子電路 · 計算工具",
        "desc": "辨識色環與SMD代碼，計算電路並尋找電阻組合。"
      },
      "arthistorynote": {
        "name": "藝術史筆記",
        "tag": "藝術 · 探索與記錄",
        "desc": "探索西方藝術流派、藝術家與作品，查看典藏博物館並記錄參觀。"
      },
      "koreanstudy": {
        "name": "韓語學習",
        "tag": "語言學習 · 韓語",
        "desc": "從韓文筆順到日常詞彙與情境會話，循序漸進學習韓語。"
      },
      "snapstudy_cbible": {
        "name": "天主教聖經問答",
        "tag": "聖經 · 每日問答",
        "desc": "透過每日問答熟悉天主教聖經，附章節出處、解析與錯題本。"
      },
      "phonecheck": {
        "name": "PhoneCheck",
        "tag": "手機 · 檢測",
        "desc": "檢測手機的感測器、螢幕、聲音、電池、相機與網路，並記錄結果以便比較。"
      },
      "wifideadzone": {
        "name": "WiFi DeadZone",
        "tag": "Wi‑Fi · 訊號檢測",
        "desc": "逐一測量各房間的 Wi‑Fi 訊號，在平面圖上用顏色找出訊號死角，並比較移動路由器前後的變化。"
      },
      "stockcalculator": {
        "name": "股票買賣計算器",
        "tag": "股票 · 計算工具",
        "desc": "計算加碼後的平均成本、交易報酬率、目標賣出價與停損價，並計入手續費與稅金。"
      }
    }
  },
  "ru": {
    "siteTitle": "Приложения J",
    "title": "Небольшие приложения\nна каждый день",
    "intro": "Выберите интересное приложение и узнайте больше на его странице.",
    "all": "Все",
    "filterLabel": "Фильтр по группам",
    "visit": "Сайт приложения",
    "newWindow": "(откроется в новом окне)",
    "languageLabel": "Выбрать язык",
    "footer": "Разные приложения — в одном месте.",
    "groups": {
      "learn": "Учёба и открытия",
      "phone": "Телефон",
      "calc": "Калькуляторы"
    },
    "apps": {
      "phonebanner": {
        "name": "LED-табло",
        "tag": "Поддержка · LED-сообщения",
        "desc": "Превратите телефон в LED-табло: настройте текст, цвет и движение для поддержки любимой команды."
      },
      "phonespec": {
        "name": "Сравнение смартфонов",
        "tag": "Смартфоны · Сравнение",
        "desc": "Ищите смартфоны и сравнивайте их размеры и основные характеристики."
      },
      "resistorcalculator": {
        "name": "Калькулятор резисторов",
        "tag": "Электроника · Расчёты",
        "desc": "Расшифровывайте цветовую маркировку и SMD-коды, рассчитывайте цепи и подбирайте сочетания резисторов."
      },
      "arthistorynote": {
        "name": "Заметки по истории искусства",
        "tag": "Искусство · Изучение и заметки",
        "desc": "Изучайте направления, художников и произведения западного искусства, музеи и заметки о посещениях."
      },
      "koreanstudy": {
        "name": "Изучение корейского",
        "tag": "Языки · Корейский",
        "desc": "Учите корейский: от порядка написания хангыля до повседневных слов и живых диалогов."
      },
      "snapstudy_cbible": {
        "name": "Католическая Библия: квиз",
        "tag": "Библия · Ежедневный квиз",
        "desc": "Изучайте католическую Библию в ежедневных викторинах: со ссылками на главы и стихи, пояснениями и тетрадью ошибок."
      },
      "phonecheck": {
        "name": "PhoneCheck",
        "tag": "Телефон · Диагностика",
        "desc": "Проверьте датчики, экран, звук, батарею, камеру и сеть телефона и сравнивайте результаты со временем."
      },
      "wifideadzone": {
        "name": "WiFi DeadZone",
        "tag": "Wi-Fi · Проверка сигнала",
        "desc": "Измеряйте сигнал Wi-Fi в каждой комнате, находите мёртвые зоны по цветам на плане и сравнивайте результаты до и после перестановки роутера."
      },
      "stockcalculator": {
        "name": "Калькулятор сделок с акциями",
        "tag": "Акции · Калькуляторы",
        "desc": "Рассчитывайте среднюю цену после докупки, доходность сделок, целевую цену продажи и стоп-лосс с учётом комиссий и налогов."
      }
    }
  },
  "ja": {
    "siteTitle": "Jのアプリ紹介",
    "title": "毎日に役立つ\n小さなアプリ",
    "intro": "気になるアプリを選んで、各アプリのサイトで詳しくご覧ください。",
    "all": "すべて",
    "filterLabel": "グループで絞り込む",
    "visit": "アプリのサイトへ",
    "newWindow": "（新しいウィンドウで開く）",
    "languageLabel": "言語を選択",
    "footer": "さまざまな用途のアプリを、一か所に。",
    "groups": {
      "learn": "学びと発見",
      "phone": "スマートフォン",
      "calc": "計算ツール"
    },
    "apps": {
      "phonebanner": {
        "name": "LED電光掲示板",
        "tag": "応援 · LEDメッセージ",
        "desc": "文字・色・動きをカスタマイズして、スマートフォンを応援用のLED電光掲示板に。"
      },
      "phonespec": {
        "name": "スマートフォン仕様比較",
        "tag": "スマートフォン · 比較",
        "desc": "スマートフォンを検索し、サイズや主な仕様を並べて比較できます。"
      },
      "resistorcalculator": {
        "name": "抵抗計算機",
        "tag": "電子回路 · 計算",
        "desc": "カラーコードやSMDコードの読み取り、回路計算、手持ちの抵抗の組み合わせ検索に。"
      },
      "arthistorynote": {
        "name": "美術史ノート",
        "tag": "美術 · 探索と記録",
        "desc": "西洋美術の流派・画家・作品を探索し、所蔵美術館や鑑賞ノートを確認できます。"
      },
      "koreanstudy": {
        "name": "韓国語学習",
        "tag": "語学学習 · 韓国語",
        "desc": "ハングルの書き順から日常の単語、場面別の会話まで、韓国語を順に学べます。"
      },
      "snapstudy_cbible": {
        "name": "カトリック聖書クイズ",
        "tag": "聖書 · 毎日のクイズ",
        "desc": "毎日のクイズでカトリック聖書に親しめます。章・節の出典、解説、間違えた問題のノート付き。"
      },
      "phonecheck": {
        "name": "PhoneCheck",
        "tag": "スマートフォン · 点検",
        "desc": "センサー、画面、音、バッテリー、カメラ、ネットワークを点検し、結果を記録して比較できます。"
      },
      "wifideadzone": {
        "name": "WiFi DeadZone",
        "tag": "Wi-Fi · 電波チェック",
        "desc": "部屋ごとにWi-Fiの電波を測り、間取り図上で電波の弱い場所を色で確認。ルーターを動かした前後の比較もできます。"
      },
      "stockcalculator": {
        "name": "株式売買計算機",
        "tag": "株式 · 計算ツール",
        "desc": "買い増し後の平均取得単価、売買の損益率、目標売却価格、損切り価格を、手数料と税金を含めて計算できます。"
      }
    }
  },
  "fr": {
    "siteTitle": "Les applications de J",
    "title": "De petites applis\npour le quotidien",
    "intro": "Choisissez l’appli qui vous intéresse et découvrez-la sur sa page.",
    "all": "Toutes",
    "filterLabel": "Filtrer par groupe",
    "visit": "Site de l’application",
    "newWindow": "(s’ouvre dans une nouvelle fenêtre)",
    "languageLabel": "Choisir la langue",
    "footer": "Des applications variées, réunies au même endroit.",
    "groups": {
      "learn": "Apprendre et explorer",
      "phone": "Téléphone",
      "calc": "Calculateurs"
    },
    "apps": {
      "phonebanner": {
        "name": "Panneau LED",
        "tag": "Encouragements · Messages LED",
        "desc": "Transformez votre téléphone en panneau LED avec du texte, des couleurs et des mouvements personnalisés."
      },
      "phonespec": {
        "name": "Comparateur de smartphones",
        "tag": "Smartphones · Comparaison",
        "desc": "Recherchez des smartphones et comparez leurs dimensions et leurs principales caractéristiques."
      },
      "resistorcalculator": {
        "name": "Calculateur de résistances",
        "tag": "Électronique · Calculs",
        "desc": "Décodez les bandes de couleur et les codes CMS, calculez vos circuits et trouvez des combinaisons de résistances."
      },
      "arthistorynote": {
        "name": "Carnet d’histoire de l’art",
        "tag": "Art · Découverte et notes",
        "desc": "Explorez les courants, les artistes et les œuvres de l’art occidental, avec les musées et vos notes de visite."
      },
      "koreanstudy": {
        "name": "Apprendre le coréen",
        "tag": "Langues · Coréen",
        "desc": "Apprenez le coréen, de l'ordre des traits du hangul au vocabulaire quotidien et aux conversations réelles."
      },
      "snapstudy_cbible": {
        "name": "Quiz biblique catholique",
        "tag": "Bible · Quiz quotidien",
        "desc": "Découvrez la Bible catholique avec des quiz quotidiens, des références chapitre-verset, des explications et un carnet d'erreurs."
      },
      "phonecheck": {
        "name": "PhoneCheck",
        "tag": "Téléphone · Diagnostic",
        "desc": "Testez les capteurs, l'écran, le son, la batterie, l'appareil photo et le réseau de votre téléphone, puis comparez les résultats."
      },
      "wifideadzone": {
        "name": "WiFi DeadZone",
        "tag": "Wi-Fi · Diagnostic du signal",
        "desc": "Mesurez le signal Wi-Fi pièce par pièce, repérez les zones mortes par couleur sur le plan et comparez avant et après le déplacement du routeur."
      },
      "stockcalculator": {
        "name": "Calculateur d’opérations boursières",
        "tag": "Bourse · Calculateurs",
        "desc": "Calculez le prix de revient moyen après un achat supplémentaire, le rendement des opérations, le prix de vente cible et le stop-loss, frais et taxes inclus."
      }
    }
  },
  "de": {
    "siteTitle": "Die Apps von J",
    "title": "Kleine Apps\nfür jeden Tag",
    "intro": "Wählen Sie eine App aus und erfahren Sie auf ihrer Seite mehr.",
    "all": "Alle",
    "filterLabel": "Nach Gruppe filtern",
    "visit": "Zur App-Website",
    "newWindow": "(öffnet in neuem Fenster)",
    "languageLabel": "Sprache wählen",
    "footer": "Verschiedene Apps, an einem Ort vereint.",
    "groups": {
      "learn": "Lernen & Entdecken",
      "phone": "Handy",
      "calc": "Rechner"
    },
    "apps": {
      "phonebanner": {
        "name": "LED-Laufschrift",
        "tag": "Anfeuern · LED-Nachrichten",
        "desc": "Verwandle dein Smartphone mit eigenen Texten, Farben und Bewegungen in eine LED-Anzeige zum Anfeuern."
      },
      "phonespec": {
        "name": "Smartphone-Vergleich",
        "tag": "Smartphones · Vergleich",
        "desc": "Suche Smartphones und vergleiche ihre Größe und wichtigsten technischen Daten nebeneinander."
      },
      "resistorcalculator": {
        "name": "Widerstandsrechner",
        "tag": "Elektronik · Berechnungen",
        "desc": "Entschlüssle Farbringe und SMD-Codes, berechne Schaltungen und finde Widerstandskombinationen."
      },
      "arthistorynote": {
        "name": "Notizen zur Kunstgeschichte",
        "tag": "Kunst · Entdecken und festhalten",
        "desc": "Entdecke westliche Kunstströmungen, Künstler und Werke sowie Museen und Besuchsnotizen."
      },
      "koreanstudy": {
        "name": "Koreanisch lernen",
        "tag": "Sprachenlernen · Koreanisch",
        "desc": "Koreanisch lernen: von der Strichfolge des Hangul über Alltagswörter bis zu echten Gesprächen."
      },
      "snapstudy_cbible": {
        "name": "Katholisches Bibel-Quiz",
        "tag": "Bibel · Tagesquiz",
        "desc": "Die katholische Bibel mit täglichen Quizfragen entdecken – mit Kapitel-und-Vers-Angaben, Erklärungen und Fehlerheft."
      },
      "phonecheck": {
        "name": "PhoneCheck",
        "tag": "Handy · Diagnose",
        "desc": "Sensoren, Display, Ton, Akku, Kamera und Netzwerk Ihres Handys prüfen und die Ergebnisse im Zeitverlauf vergleichen."
      },
      "wifideadzone": {
        "name": "WiFi DeadZone",
        "tag": "WLAN · Signalprüfung",
        "desc": "Messen Sie das WLAN-Signal in jedem Raum, erkennen Sie Funklöcher farbig im Grundriss und vergleichen Sie vor und nach dem Verschieben des Routers."
      },
      "stockcalculator": {
        "name": "Aktienhandel-Rechner",
        "tag": "Aktien · Rechner",
        "desc": "Berechnen Sie den Durchschnittskurs nach Nachkäufen, die Rendite von Trades, Kursziel und Stop-Loss – inklusive Gebühren und Steuern."
      }
    }
  }
};
