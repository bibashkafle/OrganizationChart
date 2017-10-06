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


        [HttpPost]
        public JsonResult GetTree()
        {
            var list = _treeOperation.GetTree();                          
            return Json(list,JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveTree(FormCollection request)
        {
            /*
             * IsLeaf false
             * NodeId 2
             * NodeText fdf
             * ParentNodeId 1
             * chartId tree_7729568916
             * toolTip fdf
             */
            var IsLeaf = request["IsLeaf"];
            var NodeId = request["NodeId"];
            var NodeText = request["NodeText"];
            var ParentNodeId = request["ParentNodeId"];
            var chartId = request["chartId"];
            var toolTip = request["toolTip"];

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