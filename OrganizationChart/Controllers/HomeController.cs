using System.Web.Mvc;
using OrganizationChart.Models;
using OrganizationChart.Service;

namespace OrganizationChart.Controllers
{
    public class HomeController : Controller
    {
        TreeOperation _treeOperation;
        public HomeController()
        {
            _treeOperation = new TreeOperation();
        }
        
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public JsonResult GetTree()
        {
            var list = _treeOperation.GetTree();                          
            return Json(list,JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult SaveTree()
        {
            /*
             * IsLeaf false
             * NodeId 2
             * NodeText fdf
             * ParentNodeId 1
             * chartId tree_7729568916
             * toolTip fdf
             */
            var IsLeaf = Request.Form["IsLeaf"];
            var NodeId = Request.Form["NodeId"];
            var NodeText = Request.Form["NodeText"];
            var ParentNodeId = Request.Form["ParentNodeId"];
            var chartId = Request.Form["chartId"];
            var toolTip = Request.Form["toolTip"];

            var res = _treeOperation.GetTree();
           return Json(res, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteTree()
        {
            return null;
        }
       
    }
}