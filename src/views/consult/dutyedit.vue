<template>
  <!-- 内容主体区域 -->
  <div class="bigbox" style="padding:0 10px;">
    <div class="consult">
      <p style="background:#0070e5;text-align: center;color:#fff;width:100%;line-height: 60px; font-size: 26px;">编辑值班表</p>
      <ul class="editduty">
        <li>
          <h4>是否设置值班</h4>
          <div class="guard">
            <input type="radio" name="IsDuty" v-model="consulter.uc_IsDuty" value="0"  /><label>是</label>
            <input type="radio" name="IsDuty" v-model="consulter.uc_IsDuty" value="1" /><label>否</label>
          </div>
        </li>
        <li>
          <h4>请选择值班日期</h4>
          <div class="guard">
            <input type="checkbox" v-model="week1visible" name="" value="1" checked /><label>星期一</label>
            <input type="checkbox" v-model="week2visible"  name="" value="2" checked /><label>星期二</label>
            <input type="checkbox" v-model="week3visible" name="" value="3" /><label>星期三</label>
            <input type="checkbox" v-model="week4visible" name="" value="4" /><label>星期四</label>
            <input type="checkbox" v-model="week5visible" name="" value="5" /><label>星期五</label>
            <input type="checkbox" v-model="week6visible" name="" value="6" /><label>星期六</label>
            <input type="checkbox" v-model="week7visible" name="" value="7" /><label>星期日</label>
          </div>
        </li>
        <li v-if="week1visible">
          <h4>具体值班时间和接待人数设置</h4>
          <p class="lined"><span></span>周一</p>
          <div class="guard">
            <div class="guardtop">
              <p><input type="checkbox" name="" value="" checked v-model="duty1am.IsDuty" /><label>上午</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty1am.time1">
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
                  <select v-model="duty1am.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input class="nums" v-model="duty1am.count" type="number" name="" value="" /><label>人</label></div>
            </div>
            <div class="guardmid">
              <p><input type="checkbox" name="" v-model="duty1pm.IsDuty" value="" checked /><label>下午</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty1pm.time1">
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
                  <select v-model="duty1pm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input v-model="duty1pm.count" type="number" class="nums" name="" value="" /><label>人</label></div>
            </div>
            <div class="guardbott">
              <p><input type="checkbox" name="" value="" checked v-model="duty1wm.IsDuty" /><label>晚上</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty1wm.time1">
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
                  <select v-model="duty1wm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input v-model="duty1wm.count" type="number" class="nums" name="" value="" /><label>人</label></div>
            </div>
          </div>
        </li>
        <li v-if="week2visible">
          <p class="lined"><span></span>周二</p>
          <div class="guard">
            <div class="guardtop">
              <p><input type="checkbox" name="" value="" checked  v-model="duty2am.IsDuty" /><label>上午</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty2am.time1">
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
                  <select v-model="duty2am.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input v-model="duty2am.count"class="nums" type="number" name="" value="" /><label>人</label></div>
            </div>
            <div class="guardmid">
              <p><input type="checkbox" name="" value="" v-model="duty2pm.IsDuty" checked /><label>下午</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty2pm.time1">
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
                  <select  v-model="duty2pm.time2">
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
                  <select v-model="duty2pm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input v-model="duty2pm.count" type="number" class="nums" name="" value="" /><label>人</label></div>
            </div>
            <div class="guardbott">
              <p><input type="checkbox" name="" v-model="duty2wm.IsDuty" value="" checked /><label>晚上</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty2wm.time1">
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
                  <select v-model="duty2wm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input v-model="duty2wm.count" type="number" class="nums" name="" value="" /><label>人</label></div>
            </div>
          </div>
        </li>
        <li v-if="week3visible">
          <p class="lined"><span></span>周三</p>
          <div class="guard">
            <div class="guardtop">
              <p><input type="checkbox" name="" v-model="duty3am.IsDuty" value="" checked /><label>上午</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty3am.time1">
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
                  <select v-model="duty3am.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input v-model="duty3am.count" class="nums" type="number" name="" value="" /><label>人</label></div>
            </div>
            <div class="guardmid">
              <p><input type="checkbox" name="" value="" v-model="duty3pm.IsDuty" checked /><label>下午</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty3pm.time1">
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
                  <select v-model="duty3pm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input v-model="duty3pm.count" type="number" class="nums" name="" value="" /><label>人</label></div>
            </div>
            <div class="guardbott">
              <p><input type="checkbox" name="" value="" v-model="duty3wm.IsDuty" checked /><label>晚上</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty3wm.time1">
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
                  <select v-model="duty3wm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input v-model="duty3wm.count" type="number" class="nums" name="" value="" /><label>人</label></div>
            </div>
          </div>
        </li>
        <li v-if="week4visible">
        <p class="lined"><span></span>周四</p>
        <div class="guard">
          <div class="guardtop">
            <p><input type="checkbox" v-model="duty4am.IsDuty" name="" value="" checked /><label>上午</label></p>
            <div class="zbyime">
              <span>值班时间：</span>
              <div>
                <select v-model="duty4am.time1">
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
                <select v-model="duty4am.time4">
                  <option>00</option>
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                </select>
                <label>分</label></div>
            </div>
            <div><span>可接待人数：</span><input v-model="duty4am.count" class="nums" type="number" name="" value="" /><label>人</label></div>
          </div>
          <div class="guardmid">
            <p><input type="checkbox" v-model="duty4pm.IsDuty" name="" value="" checked /><label>下午</label></p>
            <div class="zbyime">
              <span>值班时间：</span>
              <div>
                <select v-model="duty4pm.time1">
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
                <select v-model="duty4pm.time4">
                  <option>00</option>
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                </select>
                <label>分</label></div>
            </div>
            <div><span>可接待人数：</span><input v-model="duty4pm.count" type="number" class="nums" name="" value="" /><label>人</label></div>
          </div>
          <div class="guardbott">
            <p><input type="checkbox" v-model="duty4wm.IsDuty" name="" value="" checked /><label>晚上</label></p>
            <div class="zbyime">
              <span>值班时间：</span>
              <div>
                <select v-model="duty4wm.time1" >
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
                <select  v-model="duty4wm.time2" >
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
                <select v-model="duty4wm.time4">
                  <option>00</option>
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                </select>
                <label>分</label></div>
            </div>
            <div><span>可接待人数：</span><input v-model="duty4wm.count" type="number" class="nums" name="" value="" /><label>人</label></div>
          </div>
        </div>
      </li>
        <li v-if="week5visible">
          <p class="lined"><span></span>周五</p>
          <div class="guard">
            <div class="guardtop">
              <p><input type="checkbox" v-model="duty5am.IsDuty" name="" value="" checked /><label>上午</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty5am.time1">
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
                  <select v-model="duty5am.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input v-model="duty5am.count" class="nums" type="number" name="" value="" /><label>人</label></div>
            </div>
            <div class="guardmid">
              <p><input type="checkbox" name="" v-model="duty5pm.IsDuty" value="" checked /><label>下午</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty5pm.time1">
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
                  <select v-model="duty5pm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input v-model="duty5pm.count" type="number" class="nums" name="" value="" /><label>人</label></div>
            </div>
            <div class="guardbott">
              <p><input type="checkbox" v-model="duty5wm.IsDuty" name="" value="" checked /><label>晚上</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty5wm.time1">
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
                  <select  v-model="duty5wm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input  v-model="duty5wm.count" type="number" class="nums" name="" value="" /><label>人</label></div>
            </div>
          </div>
        </li>
        <li v-if="week6visible">
          <p class="lined"><span></span>周六</p>
          <div class="guard">
            <div class="guardtop">
              <p><input type="checkbox" v-model="duty6am.IsDuty" name="" value="" checked /><label>上午</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty6am.time1">
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
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input v-model="duty6am.count" class="nums" type="number" name="" value="" /><label>人</label></div>
            </div>
            <div class="guardmid">
              <p><input type="checkbox" v-model="duty6pm.IsDuty" name="" value="" checked /><label>下午</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty6pm.time1">
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
                  <select v-model="duty6pm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input v-model="duty6pm.count" type="number" class="nums" name="" value="" /><label>人</label></div>
            </div>
            <div class="guardbott">
              <p><input type="checkbox" name="" v-model="duty6wm.IsDuty" value="" checked /><label>晚上</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty6wm.time1" >
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
                  <select v-model="duty6wm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input v-model="duty6wm.count" type="number" class="nums" name="" value="" /><label>人</label></div>
            </div>
          </div>
        </li>
        <li v-if="week7visible">
          <p class="lined"><span></span>周日</p>
          <div class="guard">
            <div class="guardtop">
              <p><input type="checkbox" v-model="duty7am.IsDuty" name="" value="" checked /><label>上午</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty7am.time1">
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
                  <select v-model="duty7am.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input v-model="duty7am.count" class="nums" type="number" name="" value="" /><label>人</label></div>
            </div>
            <div class="guardmid">
              <p><input type="checkbox" name="" v-model="duty7pm.IsDuty" value="" checked /><label>下午</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select v-model="duty7pm.time1">
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
                  <select v-model="duty7pm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input v-model="duty7pm.count" type="number" class="nums" name="" value="" /><label>人</label></div>
            </div>
            <div class="guardbott">
              <p><input type="checkbox" name="" v-model="duty7wm.IsDuty" value="" checked /><label>晚上</label></p>
              <div class="zbyime">
                <span>值班时间：</span>
                <div>
                  <select  v-model="duty7wm.time1" >
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
                  <select v-model="duty7wm.time4">
                    <option>00</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                  </select>
                  <label>分</label></div>
              </div>
              <div><span>可接待人数：</span><input v-model="duty7wm.count" type="number" class="nums" name="" value="" /><label>人</label></div>
            </div>
          </div>
        </li>
        <li class="zxaddress">
          <h4>咨询室地点设置</h4>
          <div class="guard">
            <label>咨询地点：</label><input v-model="consulter.uc_Address" type="text" value="" checked />
          </div>
        </li>
        <li class="zxaddress">
          <h4>咨询室电话设置</h4>
          <div class="guard">
            <label>联系电话：</label><input v-model="consulter.uc_TelPhone" type="number" value="" checked />
          </div>
          <p class="resume">
            <button type="button" @click="editdutyhandle" class="layui-btn layui-btn-normal">确认</button>
            <button type="button" @click="$router.go(-1)" style="background: #9571f9;" class="layui-btn">返回</button>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "dutyedit",
      data(){return{
        week1visible:true,
        week2visible:true,
        week3visible:true,
        week4visible:true,
        week5visible:true,
        week6visible:true,
        week7visible:true,
        consulter:{
          uc_IsDuty:0,
          uc_DutyDates:"",
          uc_UserID:"",
          uc_Address:"",
          uc_TelPhone:""
        },
        duty1am:{
           weekName:"1" ,
        IsDuty:false,
        count:0 ,
       state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty1pm:{
          weekName:"1" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty1wm:{
          weekName:"1" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty2am:{
          weekName:"2" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty2pm:{
          weekName:"2" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty2wm:{
          weekName:"2" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty3am:{
          weekName:"3" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty3pm:{
          weekName:"3" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty3wm:{
          weekName:"3" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty4am:{
          weekName:"4" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty4pm:{
          weekName:"4" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty4wm:{
          weekName:"4" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty5am:{
          weekName:"5" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty5pm:{
          weekName:"5" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty5wm:{
          weekName:"5" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty6am:{
          weekName:"6" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty6pm:{
          weekName:"6" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty6wm:{
          weekName:"6" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty7am:{
          weekName:"7" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty7pm:{
          weekName:"7" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        },
        duty7wm:{
          weekName:"7" ,
          IsDuty:false,
          count:0 ,
          state:0,
          time1:"",
          time2:"",
          time3:"",
          time4:""
        }

      }},
      methods:{
          //保存值班
          editdutyhandle(){
            let v=this;
            let param = new URLSearchParams();
            param.append("uc_IsDuty",this.consulter.uc_IsDuty);
            if (this.week1visible) {
              this.consulter.uc_DutyDates+="1,"
            }
            if (this.week2visible) {
              this.consulter.uc_DutyDates+="2,"
            }
            if (this.week3visible) {
              this.consulter.uc_DutyDates+="3,"
            }
            if (this.week4visible) {
              this.consulter.uc_DutyDates+="4,"
            }
            if (this.week5visible) {
              this.consulter.uc_DutyDates+="5,"
            }
            if (this.week6visible) {
              this.consulter.uc_DutyDates+="6,"
            }
            if (this.week7visible) {
              this.consulter.uc_DutyDates+="7,"
            }
            if (this.consulter.uc_DutyDates!=""){
              this.consulter.uc_DutyDates=this.consulter.uc_DutyDates.substring(0,this.consulter.uc_DutyDates.length-1);
            }
            param.append("uc_DutyDates",this.consulter.uc_DutyDates);
            param.append("uc_Address",this.consulter.uc_Address);
            param.append("uc_UserID",this.consulter.uc_UserID);
            param.append("uc_TelPhone",this.consulter.uc_TelPhone);
            param.append("duty1amstring",JSON.stringify({weekName:this.duty1am.weekName,IsDuty:this.duty1am.IsDuty==false?1:0,time:this.duty1am.time1+" "+this.duty1am.time2+"~"+this.duty1am.time3+" "+this.duty1am.time4,count:this.duty1am.count,state:this.duty1am.state}));


            param.append("duty1pmstring",JSON.stringify({weekName:this.duty1pm.weekName,IsDuty:this.duty1pm.IsDuty==false?1:0,time:this.duty1pm.time1+" "+this.duty1pm.time2+"~"+this.duty1pm.time3+" "+this.duty1pm.time4,count:this.duty1pm.count,state:this.duty1pm.state}));



            param.append("duty1wmstring",JSON.stringify({weekName:this.duty1wm.weekName,IsDuty:this.duty1wm.IsDuty==false?1:0,time:this.duty1wm.time1+" "+this.duty1wm.time2+"~"+this.duty1wm.time3+" "+this.duty1wm.time4,count:this.duty1wm.count,state:this.duty1wm.state}));

            param.append("duty2amstring",JSON.stringify({weekName:this.duty2am.weekName,IsDuty:this.duty2am.IsDuty==false?1:0,time:this.duty2am.time1+" "+this.duty2am.time2+"~"+this.duty2am.time3+" "+this.duty2am.time4,count:this.duty2am.count,state:this.duty2am.state}));

            param.append("duty2pmstring",JSON.stringify({weekName:this.duty2pm.weekName,IsDuty:this.duty2pm.IsDuty==false?1:0,time:this.duty2pm.time1+" "+this.duty2pm.time2+"~"+this.duty2pm.time3+" "+this.duty2pm.time4,count:this.duty2pm.count,state:this.duty2pm.state}));
            param.append("duty2wmstring",JSON.stringify({weekName:this.duty2wm.weekName,IsDuty:this.duty2wm.IsDuty==false?1:0,time:this.duty2wm.time1+" "+this.duty2wm.time2+"~"+this.duty2wm.time3+" "+this.duty2wm.time4,count:this.duty2wm.count,state:this.duty2wm.state}));
            param.append("duty3amstring",JSON.stringify({weekName:this.duty3am.weekName,IsDuty:this.duty3am.IsDuty==false?1:0,time:this.duty3am.time1+" "+this.duty3am.time2+"~"+this.duty3am.time3+" "+this.duty3am.time4,count:this.duty3am.count,state:this.duty3am.state}));
            param.append("duty3pmstring",JSON.stringify({weekName:this.duty3pm.weekName,IsDuty:this.duty3pm.IsDuty==false?1:0,time:this.duty3pm.time1+" "+this.duty3pm.time2+"~"+this.duty3pm.time3+" "+this.duty3pm.time4,count:this.duty3pm.count,state:this.duty3pm.state}));
            param.append("duty3wmstring",JSON.stringify({weekName:this.duty3wm.weekName,IsDuty:this.duty3wm.IsDuty==false?1:0,time:this.duty3wm.time1+" "+this.duty3wm.time2+"~"+this.duty3wm.time3+" "+this.duty3wm.time4,count:this.duty3wm.count,state:this.duty3wm.state}));
            param.append("duty4amstring",JSON.stringify({weekName:this.duty4am.weekName,IsDuty:this.duty4am.IsDuty==false?1:0,time:this.duty4am.time1+" "+this.duty4am.time2+"~"+this.duty4am.time3+" "+this.duty4am.time4,count:this.duty4am.count,state:this.duty4am.state}));
            param.append("duty4pmstring",JSON.stringify({weekName:this.duty4pm.weekName,IsDuty:this.duty4pm.IsDuty==false?1:0,time:this.duty4pm.time1+" "+this.duty4pm.time2+"~"+this.duty4pm.time3+" "+this.duty4pm.time4,count:this.duty4pm.count,state:this.duty4pm.state}));
            param.append("duty4wmstring",JSON.stringify({weekName:this.duty4wm.weekName,IsDuty:this.duty4wm.IsDuty==false?1:0,time:this.duty4wm.time1+" "+this.duty4wm.time2+"~"+this.duty4wm.time3+" "+this.duty4wm.time4,count:this.duty4wm.count,state:this.duty4wm.state}));
            param.append("duty5amstring",JSON.stringify({weekName:this.duty5am.weekName,IsDuty:this.duty5am.IsDuty==false?1:0,time:this.duty5am.time1+" "+this.duty5am.time2+"~"+this.duty5am.time3+" "+this.duty5am.time4,count:this.duty5am.count,state:this.duty5am.state}));
            param.append("duty5pmstring",JSON.stringify({weekName:this.duty5pm.weekName,IsDuty:this.duty5pm.IsDuty==false?1:0,time:this.duty5pm.time1+" "+this.duty5pm.time2+"~"+this.duty5pm.time3+" "+this.duty5pm.time4,count:this.duty5pm.count,state:this.duty5pm.state}));
            param.append("duty5wmstring",JSON.stringify({weekName:this.duty5wm.weekName,IsDuty:this.duty5wm.IsDuty==false?1:0,time:this.duty5wm.time1+" "+this.duty5wm.time2+"~"+this.duty5wm.time3+" "+this.duty5wm.time4,count:this.duty5wm.count,state:this.duty5wm.state}));
            param.append("duty6amstring",JSON.stringify({weekName:this.duty6am.weekName,IsDuty:this.duty6am.IsDuty==false?1:0,time:this.duty6am.time1+" "+this.duty6am.time2+"~"+this.duty6am.time3+" "+this.duty6am.time4,count:this.duty6am.count,state:this.duty6am.state}));
            param.append("duty6pmstring",JSON.stringify({weekName:this.duty6pm.weekName,IsDuty:this.duty6pm.IsDuty==false?1:0,time:this.duty6pm.time1+" "+this.duty6pm.time2+"~"+this.duty6pm.time3+" "+this.duty6pm.time4,count:this.duty6pm.count,state:this.duty6pm.state}));
            param.append("duty6wmstring",JSON.stringify({weekName:this.duty6wm.weekName,IsDuty:this.duty6wm.IsDuty==false?1:0,time:this.duty6wm.time1+" "+this.duty6wm.time2+"~"+this.duty6wm.time3+" "+this.duty6wm.time4,count:this.duty6wm.count,state:this.duty6wm.state}));
            param.append("duty7amstring",JSON.stringify({weekName:this.duty7am.weekName,IsDuty:this.duty7am.IsDuty==false?1:0,time:this.duty7am.time1+" "+this.duty7am.time2+"~"+this.duty7am.time3+" "+this.duty7am.time4,count:this.duty7am.count,state:this.duty7am.state}));
            param.append("duty7pmstring",JSON.stringify({weekName:this.duty7pm.weekName,IsDuty:this.duty7pm.IsDuty==false?1:0,time:this.duty7pm.time1+" "+this.duty7pm.time2+"~"+this.duty7pm.time3+" "+this.duty7pm.time4,count:this.duty7pm.count,state:this.duty7pm.state}));
            param.append("duty7wmstring",JSON.stringify({weekName:this.duty7wm.weekName,IsDuty:this.duty7wm.IsDuty==false?1:0,time:this.duty7wm.time1+" "+this.duty7wm.time2+"~"+this.duty7wm.time3+" "+this.duty7wm.time4,count:this.duty7wm.count,state:this.duty7wm.state}));
            this.$ConsulationAPI.AddConsulterList(param,function(data){
              if (data.Code==1) {
                v.$message.success('编辑成功!');
              }else {
                v.$message.error('编辑失败!');
              }
            });

          },
        getdutydetail(){
            let v=this;
          let param = new URLSearchParams();

          param.append('AdminID', this.consulter.uc_UserID);

          this.userList = this.$ConsulationAPI.getConsulterDuty(param, function (data) {

            if (data.Code == 1) {

              v.consulter.uc_Address = data.Result.uc_Address;
              v.consulter.uc_IsDuty=data.Result.uc_IsDuty;
              v.consulter.uc_TelPhone=data.Result.uc_TelPhone;
              if (data.result.uc_DutyDates) {
                let dates=data.result.uc_DutyDates.split(',');
                if (dates.indexOf("1")==-1){
                  v.week1visible=false
                }
                if (dates.indexOf("2")==-1){
                  v.week1visible=false
                }
                if (dates.indexOf("3")==-1){
                  v.week1visible=false
                }
                if (dates.indexOf("4")==-1){
                  v.week1visible=false
                }
                if (dates.indexOf("5")==-1){
                  v.week1visible=false
                }
                if (dates.indexOf("6")==-1){
                  v.week1visible=false
                }
                if (dates.indexOf("7")==-1){
                  v.week1visible=false
                }

              }


            }
          });
        }
      },mounted(){
          this.consulter.uc_UserID=this.$store.state.userinfo.ID;
          this.getdutydetail();
      }
    }
</script>

<style scoped>
  @import "../../../static/css/duty.css";
  @import "../../../static/css/editduty.css";
</style>
