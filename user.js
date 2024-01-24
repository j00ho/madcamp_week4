const express = require('express');
const session = require('express-session');
const db = require('./db');
const cors = require('cors');

const router = express.Router();
const Filestore = require('session-file-store')(session);

router.use(cors({
  origin: 'http://localhost:3000', // 클라이언트의 주소
  credentials: true,
}));

// router.use(cors());

// 세션 설정
router.use(session({
  secret: 'your-secret-key', // 세션 암호화를 위한 키, 실제 프로젝트에서는 보안에 신경쓰고 설정해야 합니다.
  resave: false,
  saveUninitialized: true,
  store: new Filestore()
}));


//회원가입
router.post('/signup', async (req, res) => {
    
  try {
    const { name, id, password, profile, memo } = req.body;

    console.log('데이터가 왔니?:', name, id, password, profile, memo)
    // 아이디 중복 확인
    const [existingUser] = await db.execute('SELECT * FROM madcamp_week4.user_table WHERE id = ?', [id]);
    console.log('아이디 중복 확인 결과:', existingUser);

    if (existingUser.length > 0) {
      // 이미 존재하는 아이디인 경우
      res.status(409).json({ error: '이미 존재하는 아이디입니다.' });
    } else {
      // 사용자 정보 삽입
      await db.execute('INSERT INTO madcamp_week4.user_table (name, id, password, profile, memo) VALUES (?, ?, ?, ?, ?)',
      [name, id, password, profile, memo]);
      console.log('사용자 정보 기입 완료');

      res.json({ message: '회원가입이 완료되었습니다.' });
    }
  } catch (error) {
    console.error('회원가입 중 에러:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

//로그인
router.post('/login', async (req, res) => {
  console.log('클라이언트에서 로그인 요청이 도착했습니다.');
  const { id, password } = req.body;
  try {
    // 입력된 아이디와 비밀번호가 일치하는 사용자 확인
    const [user] = await db.execute('SELECT * FROM madcamp_week4.user_table WHERE id = ? AND password = ?', [id, password]);

    if (user.length > 0) {
      // 로그인 성공
      // 세션에 user_id 저장    
      req.session.user = user[0];
      console.log(user[0].name, user[0].user_id);
      res.json({ message: '로그인 성공', user: user[0].name });
    } else {
      // 로그인 실패
      res.status(401).json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.' });
    }
  } catch (error) {
    console.error('로그인 중 에러:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 로그아웃
router.post('/logout', async (req, res) => {
  try {
    // 현재 로그인된 사용자인지 확인
    if (req.session.user) {
      // 세션 파괴
      req.session.destroy((err) => {
        if (err) {
          console.error('로그아웃 중 에러:', err);
          res.status(500).json({ error: '서버 오류' });
        } else {
          res.json({ message: '로그아웃 성공' });
          // 로그아웃해서 session 삭제 완료되면 에러가 나지 않을 경우 main page로 redirect
          // res.redirect('/');
        }
      });
    } else {
      // 로그인되지 않은 사용자가 로그아웃 시도
      res.status(401).json({ error: '로그인 상태가 아닙니다.' });
      // res.redirect('/');
    }
  } catch (error) {
    console.error('로그아웃 중 에러:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});


// 업데이트
router.put('/updateuser', async (req, res) => {
  // 세션 또는 토큰에서 현재 로그인한 사용자의 정보를 가져옴
  const loggedInUserId = req.session.user.user_id; // 예시: 세션에서 userId를 가져오는 방법

  if (!loggedInUserId) {
      return res.status(401).json({ error: '로그인이 필요합니다.' });
  }
  console.log(loggedInUserId);
  const userId = parseInt(loggedInUserId, 10);

  const { name, profile, memo } = req.body;
  
  try {
      // userId에 해당하는 사용자 정보 업데이트
      await db.execute('UPDATE madcamp_week4.user_table SET name = ?, profile = ?, memo = ? WHERE user_id = ?',
          [name, profile, memo, userId]);

      res.json({ message: `사용자 ${name}의 정보가 업데이트되었습니다.` });
  } catch (error) {
      console.error('사용자 정보 업데이트 중 에러:', error);
      res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;

  