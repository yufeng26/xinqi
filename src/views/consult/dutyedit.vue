<template>
  <!-- 内容主体区域 -->
  <div class="bigbox">
    <div class="consult">
      <p
        style="
          background: #0070e5;
          text-align: center;
          color: #fff;
          width: 100%;
          line-height: 60px;
          font-size: 26px;
        "
      >
        编辑值班表
      </p>
      <ul class="editduty">
        <li>
          <h4>是否设置值班</h4>
          <div class="guard">
            <input
              type="radio"
              name="IsDuty"
              v-model="consulter.uc_IsDuty"
              value="0"
            /><label>是</label>
            <input
              type="radio"
              name="IsDuty"
              v-model="consulter.uc_IsDuty"
              value="1"
            /><label>否</label>
          </div>
        </li>
        <li>
          <h4>请选择值班日期</h4>
          <div class="guard">
            <input
              type="checkbox"
              v-model="week1visible"
              name=""
              value="1"
            /><label>星期一</label>
            <input
              type="checkbox"
              v-model="week2visible"
              name=""
              value="2"
            /><label>星期二</label>
            <input
              type="checkbox"
              v-model="week3visible"
              name=""
              value="3"
            /><label>星期三</label>
            <input
              type="checkbox"
              v-model="week4visible"
              name=""
              value="4"
            /><label>星期四</label>
            <input
              type="checkbox"
              v-model="week5visible"
              name=""
              value="5"
            /><label>星期五</label>
            <input
              type="checkbox"
              v-model="week6visible"
              name=""
              value="6"
            /><label>星期六</label>
            <input
              type="checkbox"
              v-model="week7visible"
              name=""
              value="7"
            /><label>星期日</label>
          </div>
        </li>
        <li v-if="week1visible">
          <h4>具体值班时间和接待人数设置</h4>
          <p class="lined"><span></span>周一</p>
          <div class="guard">
            <div class="guardtop">
              <p>
                <input
                  type="checkbox"
                  name=""
                  value=""
                  checked
                  v-model="duty1am.IsDuty"
                /><label>上午</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty1am.time1">
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty1am.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty1am.time3">
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty1am.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  class="nums"
                  v-model="duty1am.count"
                  type="number"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
            <div class="guardmid">
              <p>
                <input
                  type="checkbox"
                  name=""
                  v-model="duty1pm.IsDuty"
                  value=""
                  checked
                /><label>下午</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty1pm.time1">
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty1pm.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty1pm.time3">
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty1pm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty1pm.count"
                  type="number"
                  class="nums"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
            <div class="guardbott">
              <p>
                <input
                  type="checkbox"
                  name=""
                  value=""
                  checked
                  v-model="duty1wm.IsDuty"
                /><label>晚上</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty1wm.time1">
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty1wm.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty1wm.time3">
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty1wm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty1wm.count"
                  type="number"
                  class="nums"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
          </div>
        </li>
        <li v-if="week2visible">
          <p class="lined"><span></span>周二</p>
          <div class="guard">
            <div class="guardtop">
              <p>
                <input
                  type="checkbox"
                  name=""
                  value=""
                  checked
                  v-model="duty2am.IsDuty"
                /><label>上午</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty2am.time1">
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty2am.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty2am.time3">
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty2am.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty2am.count"
                  class="nums"
                  type="number"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
            <div class="guardmid">
              <p>
                <input
                  type="checkbox"
                  name=""
                  value=""
                  v-model="duty2pm.IsDuty"
                  checked
                /><label>下午</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty2pm.time1">
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty2pm.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty2pm.time3">
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty2pm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty2pm.count"
                  type="number"
                  class="nums"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
            <div class="guardbott">
              <p>
                <input
                  type="checkbox"
                  name=""
                  v-model="duty2wm.IsDuty"
                  value=""
                  checked
                /><label>晚上</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty2wm.time1">
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty2wm.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty2wm.time3">
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty2wm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty2wm.count"
                  type="number"
                  class="nums"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
          </div>
        </li>
        <li v-if="week3visible">
          <p class="lined"><span></span>周三</p>
          <div class="guard">
            <div class="guardtop">
              <p>
                <input
                  type="checkbox"
                  name=""
                  v-model="duty3am.IsDuty"
                  value=""
                  checked
                /><label>上午</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty3am.time1">
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty3am.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty3am.time3">
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty3am.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty3am.count"
                  class="nums"
                  type="number"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
            <div class="guardmid">
              <p>
                <input
                  type="checkbox"
                  name=""
                  value=""
                  v-model="duty3pm.IsDuty"
                  checked
                /><label>下午</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty3pm.time1">
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty3pm.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty3pm.time3">
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty3pm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty3pm.count"
                  type="number"
                  class="nums"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
            <div class="guardbott">
              <p>
                <input
                  type="checkbox"
                  name=""
                  value=""
                  v-model="duty3wm.IsDuty"
                  checked
                /><label>晚上</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty3wm.time1">
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty3wm.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty3wm.time3">
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty3wm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty3wm.count"
                  type="number"
                  class="nums"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
          </div>
        </li>
        <li v-if="week4visible">
          <p class="lined"><span></span>周四</p>
          <div class="guard">
            <div class="guardtop">
              <p>
                <input
                  type="checkbox"
                  v-model="duty4am.IsDuty"
                  name=""
                  value=""
                  checked
                /><label>上午</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty4am.time1">
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty4am.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty4am.time3">
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty4am.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty4am.count"
                  class="nums"
                  type="number"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
            <div class="guardmid">
              <p>
                <input
                  type="checkbox"
                  v-model="duty4pm.IsDuty"
                  name=""
                  value=""
                  checked
                /><label>下午</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty4pm.time1">
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty4pm.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty4pm.time3">
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty4pm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty4pm.count"
                  type="number"
                  class="nums"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
            <div class="guardbott">
              <p>
                <input
                  type="checkbox"
                  v-model="duty4wm.IsDuty"
                  name=""
                  value=""
                  checked
                /><label>晚上</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty4wm.time1">
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty4wm.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty4wm.time3">
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty4wm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty4wm.count"
                  type="number"
                  class="nums"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
          </div>
        </li>
        <li v-if="week5visible">
          <p class="lined"><span></span>周五</p>
          <div class="guard">
            <div class="guardtop">
              <p>
                <input
                  type="checkbox"
                  v-model="duty5am.IsDuty"
                  name=""
                  value=""
                  checked
                /><label>上午</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty5am.time1">
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty5am.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty5am.time3">
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty5am.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty5am.count"
                  class="nums"
                  type="number"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
            <div class="guardmid">
              <p>
                <input
                  type="checkbox"
                  name=""
                  v-model="duty5pm.IsDuty"
                  value=""
                  checked
                /><label>下午</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty5pm.time1">
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty5pm.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty5pm.time3">
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty5pm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty5pm.count"
                  type="number"
                  class="nums"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
            <div class="guardbott">
              <p>
                <input
                  type="checkbox"
                  v-model="duty5wm.IsDuty"
                  name=""
                  value=""
                  checked
                /><label>晚上</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty5wm.time1">
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty5wm.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty5wm.time3">
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty5wm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty5wm.count"
                  type="number"
                  class="nums"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
          </div>
        </li>
        <li v-if="week6visible">
          <p class="lined"><span></span>周六</p>
          <div class="guard">
            <div class="guardtop">
              <p>
                <input
                  type="checkbox"
                  v-model="duty6am.IsDuty"
                  name=""
                  value=""
                  checked
                /><label>上午</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty6am.time1">
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty6am.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty6am.time3">
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty6am.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty6am.count"
                  class="nums"
                  type="number"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
            <div class="guardmid">
              <p>
                <input
                  type="checkbox"
                  v-model="duty6pm.IsDuty"
                  name=""
                  value=""
                  checked
                /><label>下午</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty6pm.time1">
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty6pm.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty6pm.time3">
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty6pm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty6pm.count"
                  type="number"
                  class="nums"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
            <div class="guardbott">
              <p>
                <input
                  type="checkbox"
                  name=""
                  v-model="duty6wm.IsDuty"
                  value=""
                  checked
                /><label>晚上</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty6wm.time1">
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty6wm.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty6wm.time3">
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty6wm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty6wm.count"
                  type="number"
                  class="nums"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
          </div>
        </li>
        <li v-if="week7visible">
          <p class="lined"><span></span>周日</p>
          <div class="guard">
            <div class="guardtop">
              <p>
                <input
                  type="checkbox"
                  v-model="duty7am.IsDuty"
                  name=""
                  value=""
                  checked
                /><label>上午</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty7am.time1">
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty7am.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty7am.time3">
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty7am.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty7am.count"
                  class="nums"
                  type="number"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
            <div class="guardmid">
              <p>
                <input
                  type="checkbox"
                  name=""
                  v-model="duty7pm.IsDuty"
                  value=""
                  checked
                /><label>下午</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty7pm.time1">
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty7pm.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty7pm.time3">
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty7pm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty7pm.count"
                  type="number"
                  class="nums"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
            <div class="guardbott">
              <p>
                <input
                  type="checkbox"
                  name=""
                  v-model="duty7wm.IsDuty"
                  value=""
                  checked
                /><label>晚上</label>
              </p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty7wm.time1">
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty7wm.time2">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
                ---
                <div>
                  <select v-model="duty7wm.time3">
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                  </select>
                  <label>时</label>
                  <select v-model="duty7wm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label>
                </div>
              </div>
              <div>
                <span>可接待人数：</span
                ><input
                  v-model="duty7wm.count"
                  type="number"
                  class="nums"
                  name=""
                  value=""
                  min="1"
                  max="8"
                /><label>人</label>
              </div>
            </div>
          </div>
        </li>
        <li class="zxaddress">
          <h4>咨询室地点设置</h4>
          <div class="guard">
            <label>咨询地点：</label
            ><input
              v-model="consulter.uc_Address"
              type="text"
              value=""
              checked
            />
          </div>
        </li>
        <li class="zxaddress">
          <h4>咨询室电话设置</h4>
          <div class="guard">
            <label>联系电话：</label
            ><input
              v-model="consulter.uc_TelPhone"
              type="number"
              value=""
              checked
            />
          </div>
          <p class="resume">
            <button
              type="button"
              @click="editdutyhandle"
              class="layui-btn layui-btn-normal"
            >
              确认
            </button>
            <button
              type="button"
              @click="$router.go(-1)"
              style="background: #9571f9"
              class="layui-btn"
            >
              返回
            </button>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "dutyedit",
  data() {
    return {
      week1visible: true,
      week2visible: true,
      week3visible: true,
      week4visible: true,
      week5visible: true,
      week6visible: true,
      week7visible: true,
      // 基础信息
      consulter: {
        uc_IsDuty: 0,
        uc_DutyDates: "",
        uc_UserID: "",
        uc_Address: "",
        uc_TelPhone: "",
      },
      duty1am: {
        weekName: "1",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty1pm: {
        weekName: "1",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty1wm: {
        weekName: "1",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty2am: {
        weekName: "2",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty2pm: {
        weekName: "2",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty2wm: {
        weekName: "2",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty3am: {
        weekName: "3",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty3pm: {
        weekName: "3",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty3wm: {
        weekName: "3",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty4am: {
        weekName: "4",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty4pm: {
        weekName: "4",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty4wm: {
        weekName: "4",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty5am: {
        weekName: "5",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty5pm: {
        weekName: "5",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty5wm: {
        weekName: "5",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty6am: {
        weekName: "6",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty6pm: {
        weekName: "6",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty6wm: {
        weekName: "6",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty7am: {
        weekName: "7",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty7pm: {
        weekName: "7",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
      duty7wm: {
        weekName: "7",
        IsDuty: false,
        count: 0,
        state: 0,
        time1: "",
        time2: "",
        time3: "",
        time4: "",
      },
    };
  },
  methods: {
    //保存值班
    editdutyhandle() {
      let v = this;
      let param = new URLSearchParams();
      param.append("uc_IsDuty", this.consulter.uc_IsDuty);
      if (this.week1visible) {
        this.consulter.uc_DutyDates += "1,";
      }
      if (this.week2visible) {
        this.consulter.uc_DutyDates += "2,";
      }
      if (this.week3visible) {
        this.consulter.uc_DutyDates += "3,";
      }
      if (this.week4visible) {
        this.consulter.uc_DutyDates += "4,";
      }
      if (this.week5visible) {
        this.consulter.uc_DutyDates += "5,";
      }
      if (this.week6visible) {
        this.consulter.uc_DutyDates += "6,";
      }
      if (this.week7visible) {
        this.consulter.uc_DutyDates += "7,";
      }
      if (this.consulter.uc_DutyDates != "") {
        this.consulter.uc_DutyDates = this.consulter.uc_DutyDates.substring(
          0,
          this.consulter.uc_DutyDates.length - 1
        );
      }
      param.append("uc_DutyDates", this.consulter.uc_DutyDates);
      param.append("uc_Address", this.consulter.uc_Address);
      param.append("uc_UserID", this.consulter.uc_UserID);
      param.append("uc_TelPhone", this.consulter.uc_TelPhone);
      param.append(
        "duty1amstring",
        JSON.stringify({
          weekName: this.duty1am.weekName,
          IsDuty: this.duty1am.IsDuty == false ? 1 : 0,
          time:
            this.duty1am.time1 +
            ":" +
            this.duty1am.time2 +
            "~" +
            this.duty1am.time3 +
            ":" +
            this.duty1am.time4,
          count: this.duty1am.count,
          state: this.duty1am.state,
        })
      );

      param.append(
        "duty1pmstring",
        JSON.stringify({
          weekName: this.duty1pm.weekName,
          IsDuty: this.duty1pm.IsDuty == false ? 1 : 0,
          time:
            this.duty1pm.time1 +
            ":" +
            this.duty1pm.time2 +
            "~" +
            this.duty1pm.time3 +
            ":" +
            this.duty1pm.time4,
          count: this.duty1pm.count,
          state: this.duty1pm.state,
        })
      );

      param.append(
        "duty1wmstring",
        JSON.stringify({
          weekName: this.duty1wm.weekName,
          IsDuty: this.duty1wm.IsDuty == false ? 1 : 0,
          time:
            this.duty1wm.time1 +
            ":" +
            this.duty1wm.time2 +
            "~" +
            this.duty1wm.time3 +
            ":" +
            this.duty1wm.time4,
          count: this.duty1wm.count,
          state: this.duty1wm.state,
        })
      );

      param.append(
        "duty2amstring",
        JSON.stringify({
          weekName: this.duty2am.weekName,
          IsDuty: this.duty2am.IsDuty == false ? 1 : 0,
          time:
            this.duty2am.time1 +
            ":" +
            this.duty2am.time2 +
            "~" +
            this.duty2am.time3 +
            ":" +
            this.duty2am.time4,
          count: this.duty2am.count,
          state: this.duty2am.state,
        })
      );

      param.append(
        "duty2pmstring",
        JSON.stringify({
          weekName: this.duty2pm.weekName,
          IsDuty: this.duty2pm.IsDuty == false ? 1 : 0,
          time:
            this.duty2pm.time1 +
            ":" +
            this.duty2pm.time2 +
            "~" +
            this.duty2pm.time3 +
            ":" +
            this.duty2pm.time4,
          count: this.duty2pm.count,
          state: this.duty2pm.state,
        })
      );
      param.append(
        "duty2wmstring",
        JSON.stringify({
          weekName: this.duty2wm.weekName,
          IsDuty: this.duty2wm.IsDuty == false ? 1 : 0,
          time:
            this.duty2wm.time1 +
            ":" +
            this.duty2wm.time2 +
            "~" +
            this.duty2wm.time3 +
            ":" +
            this.duty2wm.time4,
          count: this.duty2wm.count,
          state: this.duty2wm.state,
        })
      );
      param.append(
        "duty3amstring",
        JSON.stringify({
          weekName: this.duty3am.weekName,
          IsDuty: this.duty3am.IsDuty == false ? 1 : 0,
          time:
            this.duty3am.time1 +
            ":" +
            this.duty3am.time2 +
            "~" +
            this.duty3am.time3 +
            ":" +
            this.duty3am.time4,
          count: this.duty3am.count,
          state: this.duty3am.state,
        })
      );
      param.append(
        "duty3pmstring",
        JSON.stringify({
          weekName: this.duty3pm.weekName,
          IsDuty: this.duty3pm.IsDuty == false ? 1 : 0,
          time:
            this.duty3pm.time1 +
            ":" +
            this.duty3pm.time2 +
            "~" +
            this.duty3pm.time3 +
            ":" +
            this.duty3pm.time4,
          count: this.duty3pm.count,
          state: this.duty3pm.state,
        })
      );
      param.append(
        "duty3wmstring",
        JSON.stringify({
          weekName: this.duty3wm.weekName,
          IsDuty: this.duty3wm.IsDuty == false ? 1 : 0,
          time:
            this.duty3wm.time1 +
            ":" +
            this.duty3wm.time2 +
            "~" +
            this.duty3wm.time3 +
            ":" +
            this.duty3wm.time4,
          count: this.duty3wm.count,
          state: this.duty3wm.state,
        })
      );
      param.append(
        "duty4amstring",
        JSON.stringify({
          weekName: this.duty4am.weekName,
          IsDuty: this.duty4am.IsDuty == false ? 1 : 0,
          time:
            this.duty4am.time1 +
            ":" +
            this.duty4am.time2 +
            "~" +
            this.duty4am.time3 +
            ":" +
            this.duty4am.time4,
          count: this.duty4am.count,
          state: this.duty4am.state,
        })
      );
      param.append(
        "duty4pmstring",
        JSON.stringify({
          weekName: this.duty4pm.weekName,
          IsDuty: this.duty4pm.IsDuty == false ? 1 : 0,
          time:
            this.duty4pm.time1 +
            ":" +
            this.duty4pm.time2 +
            "~" +
            this.duty4pm.time3 +
            ":" +
            this.duty4pm.time4,
          count: this.duty4pm.count,
          state: this.duty4pm.state,
        })
      );
      param.append(
        "duty4wmstring",
        JSON.stringify({
          weekName: this.duty4wm.weekName,
          IsDuty: this.duty4wm.IsDuty == false ? 1 : 0,
          time:
            this.duty4wm.time1 +
            ":" +
            this.duty4wm.time2 +
            "~" +
            this.duty4wm.time3 +
            ":" +
            this.duty4wm.time4,
          count: this.duty4wm.count,
          state: this.duty4wm.state,
        })
      );
      param.append(
        "duty5amstring",
        JSON.stringify({
          weekName: this.duty5am.weekName,
          IsDuty: this.duty5am.IsDuty == false ? 1 : 0,
          time:
            this.duty5am.time1 +
            ":" +
            this.duty5am.time2 +
            "~" +
            this.duty5am.time3 +
            ":" +
            this.duty5am.time4,
          count: this.duty5am.count,
          state: this.duty5am.state,
        })
      );
      param.append(
        "duty5pmstring",
        JSON.stringify({
          weekName: this.duty5pm.weekName,
          IsDuty: this.duty5pm.IsDuty == false ? 1 : 0,
          time:
            this.duty5pm.time1 +
            ":" +
            this.duty5pm.time2 +
            "~" +
            this.duty5pm.time3 +
            ":" +
            this.duty5pm.time4,
          count: this.duty5pm.count,
          state: this.duty5pm.state,
        })
      );
      param.append(
        "duty5wmstring",
        JSON.stringify({
          weekName: this.duty5wm.weekName,
          IsDuty: this.duty5wm.IsDuty == false ? 1 : 0,
          time:
            this.duty5wm.time1 +
            ":" +
            this.duty5wm.time2 +
            "~" +
            this.duty5wm.time3 +
            ":" +
            this.duty5wm.time4,
          count: this.duty5wm.count,
          state: this.duty5wm.state,
        })
      );
      param.append(
        "duty6amstring",
        JSON.stringify({
          weekName: this.duty6am.weekName,
          IsDuty: this.duty6am.IsDuty == false ? 1 : 0,
          time:
            this.duty6am.time1 +
            ":" +
            this.duty6am.time2 +
            "~" +
            this.duty6am.time3 +
            ":" +
            this.duty6am.time4,
          count: this.duty6am.count,
          state: this.duty6am.state,
        })
      );
      param.append(
        "duty6pmstring",
        JSON.stringify({
          weekName: this.duty6pm.weekName,
          IsDuty: this.duty6pm.IsDuty == false ? 1 : 0,
          time:
            this.duty6pm.time1 +
            ":" +
            this.duty6pm.time2 +
            "~" +
            this.duty6pm.time3 +
            ":" +
            this.duty6pm.time4,
          count: this.duty6pm.count,
          state: this.duty6pm.state,
        })
      );
      param.append(
        "duty6wmstring",
        JSON.stringify({
          weekName: this.duty6wm.weekName,
          IsDuty: this.duty6wm.IsDuty == false ? 1 : 0,
          time:
            this.duty6wm.time1 +
            ":" +
            this.duty6wm.time2 +
            "~" +
            this.duty6wm.time3 +
            ":" +
            this.duty6wm.time4,
          count: this.duty6wm.count,
          state: this.duty6wm.state,
        })
      );
      param.append(
        "duty7amstring",
        JSON.stringify({
          weekName: this.duty7am.weekName,
          IsDuty: this.duty7am.IsDuty == false ? 1 : 0,
          time:
            this.duty7am.time1 +
            ":" +
            this.duty7am.time2 +
            "~" +
            this.duty7am.time3 +
            ":" +
            this.duty7am.time4,
          count: this.duty7am.count,
          state: this.duty7am.state,
        })
      );
      param.append(
        "duty7pmstring",
        JSON.stringify({
          weekName: this.duty7pm.weekName,
          IsDuty: this.duty7pm.IsDuty == false ? 1 : 0,
          time:
            this.duty7pm.time1 +
            ":" +
            this.duty7pm.time2 +
            "~" +
            this.duty7pm.time3 +
            ":" +
            this.duty7pm.time4,
          count: this.duty7pm.count,
          state: this.duty7pm.state,
        })
      );
      param.append(
        "duty7wmstring",
        JSON.stringify({
          weekName: this.duty7wm.weekName,
          IsDuty: this.duty7wm.IsDuty == false ? 1 : 0,
          time:
            this.duty7wm.time1 +
            ":" +
            this.duty7wm.time2 +
            "~" +
            this.duty7wm.time3 +
            ":" +
            this.duty7wm.time4,
          count: this.duty7wm.count,
          state: this.duty7wm.state,
        })
      );
      this.$ConsulationAPI.AddConsulterList(param, function (data) {
        if (data.Code == 1) {
          v.$message.success("编辑成功!");
        } else {
          v.$message.error("编辑失败!");
        }
      });
    },
    // 获取值班信息
    getdutydetail() {
      let v = this;
      let param = new URLSearchParams();

      param.append("AdminID", this.consulter.uc_UserID);

      this.userList = this.$ConsulationAPI.getConsulterDuty(param, function (
        data
      ) {
        if (data.Code == 1) {
          v.consulter.uc_Address = data.Result.uc_Address;
          v.consulter.uc_IsDuty = data.Result.uc_IsDuty;
          v.consulter.uc_TelPhone = data.Result.uc_TelPhone;
          // 周一
          // 早
          v.duty1am.IsDuty = data.Result.duty1am.IsDuty == 0 ? true : false;
          v.duty1am.count = data.Result.duty1am.count;
          v.duty1am.state = data.Result.duty1am.state;
          v.duty1am.time1 = v.zhuanArr(data.Result.duty1am.time)[0];
          v.duty1am.time2 = v.zhuanArr(data.Result.duty1am.time)[1];
          v.duty1am.time3 = v.zhuanArr(data.Result.duty1am.time)[2];
          v.duty1am.time4 = v.zhuanArr(data.Result.duty1am.time)[3];
          // 中
          v.duty1pm.IsDuty = data.Result.duty1pm.IsDuty == 0 ? true : false;
          v.duty1pm.count = data.Result.duty1pm.count;
          v.duty1pm.state = data.Result.duty1pm.state;
          v.duty1pm.time1 = v.zhuanArr(data.Result.duty1pm.time)[0];
          v.duty1pm.time2 = v.zhuanArr(data.Result.duty1pm.time)[1];
          v.duty1pm.time3 = v.zhuanArr(data.Result.duty1pm.time)[2];
          v.duty1pm.time4 = v.zhuanArr(data.Result.duty1pm.time)[3];
          // 晚
          v.duty1wm.IsDuty = data.Result.duty1wm.IsDuty == 0 ? true : false;
          v.duty1wm.count = data.Result.duty1wm.count;
          v.duty1wm.state = data.Result.duty1wm.state;
          v.duty1wm.time1 = v.zhuanArr(data.Result.duty1wm.time)[0];
          v.duty1wm.time2 = v.zhuanArr(data.Result.duty1wm.time)[1];
          v.duty1wm.time3 = v.zhuanArr(data.Result.duty1wm.time)[2];
          v.duty1wm.time4 = v.zhuanArr(data.Result.duty1wm.time)[3];
          // let zz = v.zhuanArr(data.Result.duty1am.time);
          // 周二
          // 早
          v.duty2am.IsDuty = data.Result.duty2am.IsDuty == 0 ? true : false;
          v.duty2am.count = data.Result.duty2am.count;
          v.duty2am.state = data.Result.duty2am.state;
          v.duty2am.time1 = v.zhuanArr(data.Result.duty2am.time)[0];
          v.duty2am.time2 = v.zhuanArr(data.Result.duty2am.time)[1];
          v.duty2am.time3 = v.zhuanArr(data.Result.duty2am.time)[2];
          v.duty2am.time4 = v.zhuanArr(data.Result.duty2am.time)[3];
          // 中
          v.duty2pm.IsDuty = data.Result.duty2pm.IsDuty == 0 ? true : false;
          v.duty2pm.count = data.Result.duty2pm.count;
          v.duty2pm.state = data.Result.duty2pm.state;
          v.duty2pm.time1 = v.zhuanArr(data.Result.duty2pm.time)[0];
          v.duty2pm.time2 = v.zhuanArr(data.Result.duty2pm.time)[1];
          v.duty2pm.time3 = v.zhuanArr(data.Result.duty2pm.time)[2];
          v.duty2pm.time4 = v.zhuanArr(data.Result.duty2pm.time)[3];
          // 晚
          v.duty2wm.IsDuty = data.Result.duty2wm.IsDuty == 0 ? true : false;
          v.duty2wm.count = data.Result.duty2wm.count;
          v.duty2wm.state = data.Result.duty2wm.state;
          v.duty2wm.time1 = v.zhuanArr(data.Result.duty2wm.time)[0];
          v.duty2wm.time2 = v.zhuanArr(data.Result.duty2wm.time)[1];
          v.duty2wm.time3 = v.zhuanArr(data.Result.duty2wm.time)[2];
          v.duty2wm.time4 = v.zhuanArr(data.Result.duty2wm.time)[3];
          // 周三
          // 早
          v.duty3am.IsDuty = data.Result.duty3am.IsDuty == 0 ? true : false;
          v.duty3am.count = data.Result.duty3am.count;
          v.duty3am.state = data.Result.duty3am.state;
          v.duty3am.time1 = v.zhuanArr(data.Result.duty3am.time)[0];
          v.duty3am.time2 = v.zhuanArr(data.Result.duty3am.time)[1];
          v.duty3am.time3 = v.zhuanArr(data.Result.duty3am.time)[2];
          v.duty3am.time4 = v.zhuanArr(data.Result.duty3am.time)[3];
          // 中
          v.duty3pm.IsDuty = data.Result.duty3pm.IsDuty == 0 ? true : false;
          v.duty3pm.count = data.Result.duty3pm.count;
          v.duty3pm.state = data.Result.duty3pm.state;
          v.duty3pm.time1 = v.zhuanArr(data.Result.duty3pm.time)[0];
          v.duty3pm.time2 = v.zhuanArr(data.Result.duty3pm.time)[1];
          v.duty3pm.time3 = v.zhuanArr(data.Result.duty3pm.time)[2];
          v.duty3pm.time4 = v.zhuanArr(data.Result.duty3pm.time)[3];
          // 晚
          v.duty3wm.IsDuty = data.Result.duty3wm.IsDuty == 0 ? true : false;
          v.duty3wm.count = data.Result.duty3wm.count;
          v.duty3wm.state = data.Result.duty3wm.state;
          v.duty3wm.time1 = v.zhuanArr(data.Result.duty3wm.time)[0];
          v.duty3wm.time2 = v.zhuanArr(data.Result.duty3wm.time)[1];
          v.duty3wm.time3 = v.zhuanArr(data.Result.duty3wm.time)[2];
          v.duty3wm.time4 = v.zhuanArr(data.Result.duty3wm.time)[3];
          // 周四
          // 早
          v.duty4am.IsDuty = data.Result.duty4am.IsDuty == 0 ? true : false;
          v.duty4am.count = data.Result.duty4am.count;
          v.duty4am.state = data.Result.duty4am.state;
          v.duty4am.time1 = v.zhuanArr(data.Result.duty4am.time)[0];
          v.duty4am.time2 = v.zhuanArr(data.Result.duty4am.time)[1];
          v.duty4am.time3 = v.zhuanArr(data.Result.duty4am.time)[2];
          v.duty4am.time4 = v.zhuanArr(data.Result.duty4am.time)[3];
          // 中
          v.duty4pm.IsDuty = data.Result.duty4pm.IsDuty == 0 ? true : false;
          v.duty4pm.count = data.Result.duty4pm.count;
          v.duty4pm.state = data.Result.duty4pm.state;
          v.duty4pm.time1 = v.zhuanArr(data.Result.duty4pm.time)[0];
          v.duty4pm.time2 = v.zhuanArr(data.Result.duty4pm.time)[1];
          v.duty4pm.time3 = v.zhuanArr(data.Result.duty4pm.time)[2];
          v.duty4pm.time4 = v.zhuanArr(data.Result.duty4pm.time)[3];
          // 晚
          v.duty4wm.IsDuty = data.Result.duty4wm.IsDuty == 0 ? true : false;
          v.duty4wm.count = data.Result.duty4wm.count;
          v.duty4wm.state = data.Result.duty4wm.state;
          v.duty4wm.time1 = v.zhuanArr(data.Result.duty4wm.time)[0];
          v.duty4wm.time2 = v.zhuanArr(data.Result.duty4wm.time)[1];
          v.duty4wm.time3 = v.zhuanArr(data.Result.duty4wm.time)[2];
          v.duty4wm.time4 = v.zhuanArr(data.Result.duty4wm.time)[3];
          // 周五
          // 早
          v.duty5am.IsDuty = data.Result.duty5am.IsDuty == 0 ? true : false;
          v.duty5am.count = data.Result.duty5am.count;
          v.duty5am.state = data.Result.duty5am.state;
          v.duty5am.time1 = v.zhuanArr(data.Result.duty5am.time)[0];
          v.duty5am.time2 = v.zhuanArr(data.Result.duty5am.time)[1];
          v.duty5am.time3 = v.zhuanArr(data.Result.duty5am.time)[2];
          v.duty5am.time4 = v.zhuanArr(data.Result.duty5am.time)[3];
          // 中
          v.duty5pm.IsDuty = data.Result.duty5pm.IsDuty == 0 ? true : false;
          v.duty5pm.count = data.Result.duty5pm.count;
          v.duty5pm.state = data.Result.duty5pm.state;
          v.duty5pm.time1 = v.zhuanArr(data.Result.duty5pm.time)[0];
          v.duty5pm.time2 = v.zhuanArr(data.Result.duty5pm.time)[1];
          v.duty5pm.time3 = v.zhuanArr(data.Result.duty5pm.time)[2];
          v.duty5pm.time4 = v.zhuanArr(data.Result.duty5pm.time)[3];
          // 晚
          v.duty5wm.IsDuty = data.Result.duty5wm.IsDuty == 0 ? true : false;
          v.duty5wm.count = data.Result.duty5wm.count;
          v.duty5wm.state = data.Result.duty5wm.state;
          v.duty5wm.time1 = v.zhuanArr(data.Result.duty5wm.time)[0];
          v.duty5wm.time2 = v.zhuanArr(data.Result.duty5wm.time)[1];
          v.duty5wm.time3 = v.zhuanArr(data.Result.duty5wm.time)[2];
          v.duty5wm.time4 = v.zhuanArr(data.Result.duty5wm.time)[3];
          // 周六
          // 早
          v.duty6am.IsDuty = data.Result.duty6am.IsDuty == 0 ? true : false;
          v.duty6am.count = data.Result.duty6am.count;
          v.duty6am.state = data.Result.duty6am.state;
          v.duty6am.time1 = v.zhuanArr(data.Result.duty6am.time)[0];
          v.duty6am.time2 = v.zhuanArr(data.Result.duty6am.time)[1];
          v.duty6am.time3 = v.zhuanArr(data.Result.duty6am.time)[2];
          v.duty6am.time4 = v.zhuanArr(data.Result.duty6am.time)[3];
          // 中
          v.duty6pm.IsDuty = data.Result.duty6pm.IsDuty == 0 ? true : false;
          v.duty6pm.count = data.Result.duty6pm.count;
          v.duty6pm.state = data.Result.duty6pm.state;
          v.duty6pm.time1 = v.zhuanArr(data.Result.duty6pm.time)[0];
          v.duty6pm.time2 = v.zhuanArr(data.Result.duty6pm.time)[1];
          v.duty6pm.time3 = v.zhuanArr(data.Result.duty6pm.time)[2];
          v.duty6pm.time4 = v.zhuanArr(data.Result.duty6pm.time)[3];
          // 晚
          v.duty6wm.IsDuty = data.Result.duty6wm.IsDuty == 0 ? true : false;
          v.duty6wm.count = data.Result.duty6wm.count;
          v.duty6wm.state = data.Result.duty6wm.state;
          v.duty6wm.time1 = v.zhuanArr(data.Result.duty6wm.time)[0];
          v.duty6wm.time2 = v.zhuanArr(data.Result.duty6wm.time)[1];
          v.duty6wm.time3 = v.zhuanArr(data.Result.duty6wm.time)[2];
          v.duty6wm.time4 = v.zhuanArr(data.Result.duty6wm.time)[3];
          // 周日
          // 早
          v.duty7am.IsDuty = data.Result.duty7am.IsDuty == 0 ? true : false;
          v.duty7am.count = data.Result.duty7am.count;
          v.duty7am.state = data.Result.duty7am.state;
          v.duty7am.time1 = v.zhuanArr(data.Result.duty7am.time)[0];
          v.duty7am.time2 = v.zhuanArr(data.Result.duty7am.time)[1];
          v.duty7am.time3 = v.zhuanArr(data.Result.duty7am.time)[2];
          v.duty7am.time4 = v.zhuanArr(data.Result.duty7am.time)[3];
          // 中
          v.duty7pm.IsDuty = data.Result.duty7pm.IsDuty == 0 ? true : false;
          v.duty7pm.count = data.Result.duty7pm.count;
          v.duty7pm.state = data.Result.duty7pm.state;
          v.duty7pm.time1 = v.zhuanArr(data.Result.duty7pm.time)[0];
          v.duty7pm.time2 = v.zhuanArr(data.Result.duty7pm.time)[1];
          v.duty7pm.time3 = v.zhuanArr(data.Result.duty7pm.time)[2];
          v.duty7pm.time4 = v.zhuanArr(data.Result.duty7pm.time)[3];
          // 晚
          v.duty7wm.IsDuty = data.Result.duty7wm.IsDuty == 0 ? true : false;
          v.duty7wm.count = data.Result.duty7wm.count;
          v.duty7wm.state = data.Result.duty7wm.state;
          v.duty7wm.time1 = v.zhuanArr(data.Result.duty7wm.time)[0];
          v.duty7wm.time2 = v.zhuanArr(data.Result.duty7wm.time)[1];
          v.duty7wm.time3 = v.zhuanArr(data.Result.duty7wm.time)[2];
          v.duty7wm.time4 = v.zhuanArr(data.Result.duty7wm.time)[3];
          // uc_DutyDates周一到周日
          if (data.result.uc_DutyDates) {
            let dates = data.result.uc_DutyDates.split(",");
            if (dates.indexOf("1") == -1) {
              v.week1visible = false;
            }
            if (dates.indexOf("2") == -1) {
              v.week1visible = false;
            }
            if (dates.indexOf("3") == -1) {
              v.week1visible = false;
            }
            if (dates.indexOf("4") == -1) {
              v.week1visible = false;
            }
            if (dates.indexOf("5") == -1) {
              v.week1visible = false;
            }
            if (dates.indexOf("6") == -1) {
              v.week1visible = false;
            }
            if (dates.indexOf("7") == -1) {
              v.week1visible = false;
            }
          }
          // 给表格赋值
          //   weekName: "1",
          // IsDuty: false,
          // count: 0,
          // state: 0,
          // time1: "",
          // time2: "",
          // time3: "",
          // time4: "",
        }
      });
    },
    // 转义时间字符串变成数组
    zhuanArr(str) {
      return str.replace(/[~:]/g, ",").split(",");
    },
  },
  mounted() {
    this.consulter.uc_UserID = this.$store.state.userinfo.ID;
    this.getdutydetail();
  },
};
</script>

<style scoped>
@import "../../../static/css/duty.css";
@import "../../../static/css/editduty.css";
</style>
