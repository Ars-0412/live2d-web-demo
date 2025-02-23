import './style.css';
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppDelegate } from './lappdelegate';
import * as LAppDefine from './lappdefine';

/**
 * ブラウザロード後の処理
 */
window.addEventListener(
  'load',
  (): void => {
    // Initialize WebGL and create the application instance
    if (!LAppDelegate.getInstance().initialize()) {
      return;
    }

    LAppDelegate.getInstance().run();
  },
  { passive: true }
);

/**
 * 終了時の処理
 */
window.addEventListener(
  'beforeunload',
  (): void => LAppDelegate.releaseInstance(),
  { passive: true }
);

const modelPath = '/mao.model3.json';

 // 必要なアセットファイルをインポート


















































































































































import "./assets/back_class_normal.png";
import "./assets/Haru/expressions/F01.exp3.json";
import "./assets/Haru/expressions/F02.exp3.json";
import "./assets/Haru/expressions/F03.exp3.json";
import "./assets/Haru/expressions/F04.exp3.json";
import "./assets/Haru/expressions/F05.exp3.json";
import "./assets/Haru/expressions/F06.exp3.json";
import "./assets/Haru/expressions/F07.exp3.json";
import "./assets/Haru/expressions/F08.exp3.json";
import "./assets/Haru/Haru.2048/texture_00.png";
import "./assets/Haru/Haru.2048/texture_01.png";
import "./assets/Haru/Haru.cdi3.json";
import "./assets/Haru/Haru.model3.json";
import "./assets/Haru/Haru.physics3.json";
import "./assets/Haru/Haru.pose3.json";
import "./assets/Haru/Haru.userdata3.json";
import "./assets/Haru/motions/haru_g_idle.motion3.json";
import "./assets/Haru/motions/haru_g_m01.motion3.json";
import "./assets/Haru/motions/haru_g_m02.motion3.json";
import "./assets/Haru/motions/haru_g_m03.motion3.json";
import "./assets/Haru/motions/haru_g_m04.motion3.json";
import "./assets/Haru/motions/haru_g_m05.motion3.json";
import "./assets/Haru/motions/haru_g_m06.motion3.json";
import "./assets/Haru/motions/haru_g_m07.motion3.json";
import "./assets/Haru/motions/haru_g_m08.motion3.json";
import "./assets/Haru/motions/haru_g_m09.motion3.json";
import "./assets/Haru/motions/haru_g_m10.motion3.json";
import "./assets/Haru/motions/haru_g_m11.motion3.json";
import "./assets/Haru/motions/haru_g_m12.motion3.json";
import "./assets/Haru/motions/haru_g_m13.motion3.json";
import "./assets/Haru/motions/haru_g_m14.motion3.json";
import "./assets/Haru/motions/haru_g_m15.motion3.json";
import "./assets/Haru/motions/haru_g_m16.motion3.json";
import "./assets/Haru/motions/haru_g_m17.motion3.json";
import "./assets/Haru/motions/haru_g_m18.motion3.json";
import "./assets/Haru/motions/haru_g_m19.motion3.json";
import "./assets/Haru/motions/haru_g_m20.motion3.json";
import "./assets/Haru/motions/haru_g_m21.motion3.json";
import "./assets/Haru/motions/haru_g_m22.motion3.json";
import "./assets/Haru/motions/haru_g_m23.motion3.json";
import "./assets/Haru/motions/haru_g_m24.motion3.json";
import "./assets/Haru/motions/haru_g_m25.motion3.json";
import "./assets/Haru/motions/haru_g_m26.motion3.json";
import "./assets/Haru/sounds/haru_Info_04.wav";
import "./assets/Haru/sounds/haru_Info_14.wav";
import "./assets/Haru/sounds/haru_normal_6.wav";
import "./assets/Haru/sounds/haru_talk_13.wav";
import "./assets/Hiyori/Hiyori.2048/texture_00.png";
import "./assets/Hiyori/Hiyori.2048/texture_01.png";
import "./assets/Hiyori/Hiyori.cdi3.json";
import "./assets/Hiyori/Hiyori.model3.json";
import "./assets/Hiyori/Hiyori.physics3.json";
import "./assets/Hiyori/Hiyori.pose3.json";
import "./assets/Hiyori/Hiyori.userdata3.json";
import "./assets/Hiyori/motions/Hiyori_m01.motion3.json";
import "./assets/Hiyori/motions/Hiyori_m02.motion3.json";
import "./assets/Hiyori/motions/Hiyori_m03.motion3.json";
import "./assets/Hiyori/motions/Hiyori_m04.motion3.json";
import "./assets/Hiyori/motions/Hiyori_m05.motion3.json";
import "./assets/Hiyori/motions/Hiyori_m06.motion3.json";
import "./assets/Hiyori/motions/Hiyori_m07.motion3.json";
import "./assets/Hiyori/motions/Hiyori_m08.motion3.json";
import "./assets/Hiyori/motions/Hiyori_m09.motion3.json";
import "./assets/Hiyori/motions/Hiyori_m10.motion3.json";
import "./assets/icon_gear.png";
import "./assets/Mao/expressions/exp_01.exp3.json";
import "./assets/Mao/expressions/exp_02.exp3.json";
import "./assets/Mao/expressions/exp_03.exp3.json";
import "./assets/Mao/expressions/exp_04.exp3.json";
import "./assets/Mao/expressions/exp_05.exp3.json";
import "./assets/Mao/expressions/exp_06.exp3.json";
import "./assets/Mao/expressions/exp_07.exp3.json";
import "./assets/Mao/expressions/exp_08.exp3.json";
import "./assets/Mao/Mao.2048/texture_00.png";
import "./assets/Mao/Mao.cdi3.json";
import "./assets/Mao/Mao.model3.json";
import "./assets/Mao/Mao.physics3.json";
import "./assets/Mao/Mao.pose3.json";
import "./assets/Mao/motions/mtn_01.motion3.json";
import "./assets/Mao/motions/mtn_02.motion3.json";
import "./assets/Mao/motions/mtn_03.motion3.json";
import "./assets/Mao/motions/mtn_04.motion3.json";
import "./assets/Mao/motions/sample_01.motion3.json";
import "./assets/Mao/motions/special_01.motion3.json";
import "./assets/Mao/motions/special_02.motion3.json";
import "./assets/Mao/motions/special_03.motion3.json";
import "./assets/Mark/Mark.2048/texture_00.png";
import "./assets/Mark/Mark.cdi3.json";
import "./assets/Mark/Mark.model3.json";
import "./assets/Mark/Mark.physics3.json";
import "./assets/Mark/Mark.userdata3.json";
import "./assets/Mark/motions/mark_m01.motion3.json";
import "./assets/Mark/motions/mark_m02.motion3.json";
import "./assets/Mark/motions/mark_m03.motion3.json";
import "./assets/Mark/motions/mark_m04.motion3.json";
import "./assets/Mark/motions/mark_m05.motion3.json";
import "./assets/Mark/motions/mark_m06.motion3.json";
import "./assets/Natori/exp/Angry.exp3.json";
import "./assets/Natori/exp/Blushing.exp3.json";
import "./assets/Natori/exp/exp_01.exp3.json";
import "./assets/Natori/exp/exp_02.exp3.json";
import "./assets/Natori/exp/exp_03.exp3.json";
import "./assets/Natori/exp/exp_04.exp3.json";
import "./assets/Natori/exp/exp_05.exp3.json";
import "./assets/Natori/exp/Normal.exp3.json";
import "./assets/Natori/exp/Sad.exp3.json";
import "./assets/Natori/exp/Smile.exp3.json";
import "./assets/Natori/exp/Surprised.exp3.json";
import "./assets/Natori/motions/mtn_00.motion3.json";
import "./assets/Natori/motions/mtn_01.motion3.json";
import "./assets/Natori/motions/mtn_02.motion3.json";
import "./assets/Natori/motions/mtn_03.motion3.json";
import "./assets/Natori/motions/mtn_04.motion3.json";
import "./assets/Natori/motions/mtn_05.motion3.json";
import "./assets/Natori/motions/mtn_06.motion3.json";
import "./assets/Natori/motions/mtn_07.motion3.json";
import "./assets/Natori/Natori.2048/texture_00.png";
import "./assets/Natori/Natori.cdi3.json";
import "./assets/Natori/Natori.model3.json";
import "./assets/Natori/Natori.physics3.json";
import "./assets/Natori/Natori.pose3.json";
import "./assets/Rice/motions/idle.motion3.json";
import "./assets/Rice/motions/mtn_01.motion3.json";
import "./assets/Rice/motions/mtn_02.motion3.json";
import "./assets/Rice/motions/mtn_03.motion3.json";
import "./assets/Rice/Rice.2048/texture_00.png";
import "./assets/Rice/Rice.2048/texture_01.png";
import "./assets/Rice/Rice.cdi3.json";
import "./assets/Rice/Rice.model3.json";
import "./assets/Rice/Rice.physics3.json";
import "./assets/Wanko/motions/idle_01.motion3.json";
import "./assets/Wanko/motions/idle_02.motion3.json";
import "./assets/Wanko/motions/idle_03.motion3.json";
import "./assets/Wanko/motions/idle_04.motion3.json";
import "./assets/Wanko/motions/shake_01.motion3.json";
import "./assets/Wanko/motions/shake_02.motion3.json";
import "./assets/Wanko/motions/touch_01.motion3.json";
import "./assets/Wanko/motions/touch_02.motion3.json";
import "./assets/Wanko/motions/touch_03.motion3.json";
import "./assets/Wanko/motions/touch_04.motion3.json";
import "./assets/Wanko/motions/touch_05.motion3.json";
import "./assets/Wanko/motions/touch_06.motion3.json";
import "./assets/Wanko/Wanko.1024/texture_00.png";
import "./assets/Wanko/Wanko.cdi3.json";
import "./assets/Wanko/Wanko.model3.json";
import "./assets/Wanko/Wanko.physics3.json";