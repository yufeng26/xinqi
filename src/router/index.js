import Index from "@/views/index/index";
import Admin from "@/views/admin/admin";
import AddAdmin from "@/views/admin/addadmin"; // 添加管理员
import EditAdmin from "@/views/admin/adminlook"; // 编辑个人中心
import AdminCenter from "@/views/admin/admincenter"; // 个人中心
import AllocationUser from "@/views/admin/AllocationUser";
import Group from "@/views/user/group";
import User from "@/views/user/user";
import AddUser from "@/views/user/adduser";
import EditUser from "@/views/user/userlook";
import ImportUser from "@/views/user/userimport";
import PlcreateUser from "@/views/user/userplcreate";
import TestResult from "@/views/testresult/testresult";
import TestReport from "@/views/testresult/testreport";
import Testttreport from "@/views/testresult/testttreport";
import Tuanbaogao from "@/views/testresult/tuanbaogao";
import Planscheme from "@/views/planscheme/planscheme";
import PlanReport from "@/views/planscheme/planschemereport";
import Ceping from "@/views/Device/ceping";
import CepingReport from "@/views/Device/cepingreport";
import NahanReport from "@/views/Device/nahanreport";
import XunlianReport from "@/views/Device/planreport";
import Baisirui from "@/views/Device/baisirui";
import Jida from "@/views/Device/jida";
import Nahan from "@/views/Device/nahan";
import Yongbao from "@/views/Device/yongbao";
import Zixinxin from "@/views/Device/zixinxin";
import Consult from "@/views/consult/consult";
import Duty from "@/views/consult/duty";
import DutyEdit from "@/views/consult/dutyedit";
import Backup from "@/views/system/backup";
import Extendfiled from "@/views/system/extendfiled";
import Home from "@/views/home";
import Login from "@/views/login";
import Allocation from "@/views/admin/allocation";

export default [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: "/index",
        name: "index",
        component: Index,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/admin",
        name: "admin",
        component: Admin,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/addadmin",
        name: "addadmin",
        component: AddAdmin,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/AllocationUser",
        name: "AllocationUser",
        component: AllocationUser,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/editadmin",
        name: "editadmin",
        component: EditAdmin,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/admincenter",
        name: "admincenter",
        component: AdminCenter,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/userplcreate",
        name: "userplcreate",
        component: PlcreateUser,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/user",
        name: "user",
        component: User,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/group",
        name: "group",
        component: Group,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/adduser",
        name: "adduser",
        component: AddUser,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/edituser",
        name: "edituser",
        component: EditUser,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/importuser",
        name: "importuser",
        component: ImportUser,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/testresult",
        name: "testresult",
        component: TestResult,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/testreport",
        name: "testreport",
        component: TestReport,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/testttreport",
        name: "testttreport",
        component: Testttreport,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/tuanbaogao",
        name: "tuanbaogao",
        component: Tuanbaogao,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/planscheme",
        name: "planscheme",
        component: Planscheme,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/planreport",
        name: "planreport",
        component: PlanReport,
        meta: {
          requireAuth: true
        }
      },

      {
        path: "/deviceceping",
        name: "deviceceping",
        component: Ceping,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/nahanreport",
        name: "nahanreport",
        component: NahanReport,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/cepingreport",
        name: "cepingreport",
        component: CepingReport,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/xunlianreport",
        name: "xunlianreport",
        component: XunlianReport,
        meta: {
          requireAuth: true
        }
      },

      {
        path: "/devicebaisirui",
        name: "devicebaisirui",
        component: Baisirui,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/devicejida",
        name: "devicejida",
        component: Jida,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/devicenahan",
        name: "devicenahan",
        component: Nahan,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/deviceyongbao",
        name: "deviceyongbao",
        component: Yongbao,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/devicezixinxin",
        name: "devicezixinxin",
        component: Zixinxin,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/consult",
        name: "consult",
        component: Consult,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/duty",
        name: "duty",
        component: Duty,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/dutyedit",
        name: "dutyedit",
        component: DutyEdit,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/backup",
        name: "backup",
        component: Backup,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/extendfiled",
        name: "extendfiled",
        component: Extendfiled,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/allocation",
        name: "allocation",
        component: Allocation,
        meta: {
          requireAuth: true
        }
      }
    ],
    meta: {
      requireAuth: true
    }
  }
];
