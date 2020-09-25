<template>

  <div  class="bigbox">
<div class="report">
        
          
       <div class="img1"><img src="../../../static/img/scl90tt/1.png"></div>
        <div class="img1"><img src="../../../static/img/scl90tt/2.png"></div>
         <div class="img1"><img src="../../../static/img/scl90tt/3.png"></div>
          <div class="img1"><img src="../../../static/img/scl90tt/4.png"></div>
            <div class="img1"><img src="../../../static/img/scl90tt/5.png"></div>
              <div class="img1"><img src="../../../static/img/scl90tt/6.png"></div>
    </div>
    <div style="display: flex;justify-content: center;margin-top: 80px;">
      <button type="button" style="background: #01c8e7;" @click="ExportRow" class="layui-btn layui-btn-lg">导出</button>
    </div>
  </div>





</template>

<script>
    export default {
        name: "tuanbaogao",
      data(){
          return{
            testresult:{
              ID:"",
              UserName:"",
              GroupName:"",
              RealName:"",
              Education:"",
              Sex:"",
              Birthday:"",
              ReportTime:"",
              ReportHour:"",
              Score:"",
              Grade:"",
              disimionslist:[],
              disimions:[],
              Suggestion:"",
              planschemelist:"",
              Comment
            }
          }


      },
      methods:{
          getdetail(){
            let v=this;
            let params = new URLSearchParams();
            params.append('testResultID',this.testresult.ID)
            this.$TestResultAPI.getResultDetail(params,function (data) {
              if (data.Code==1) {
                v.testresult=data.Result;
                console.log(v.testresult)
              }

            })
          },
           ExportRow(){
          // this.$TestResultAPI.ReportResult(this.testresult.ID);
            let url="../../../static/img/zxststt.rar"
         const elt = document.createElement('a');
 elt.setAttribute('href', url);
 elt.setAttribute('download', '中学生投射测验团体报告.rar');
 elt.style.display = 'none';
 document.body.appendChild(elt);
 elt.click();
 document.body.removeChild(elt);
        }
      },
      mounted(){
          this.testresult.ID=this.$route.query.ID;
        this.getdetail();

      },
      computed:{
        }
    }
</script>

<style scoped>
@import "../../../static/css/appraisallook.css";
</style>
