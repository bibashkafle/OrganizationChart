using System.Collections.Generic;
using System.Web.Mvc;
using Newtonsoft.Json;
using OrganizationChart.Models;

namespace OrganizationChart.Controllers
{
    public class HomeController : Controller
    {
        private string DATABASE = @"C:\Users\bibash\documents\visual studio 2017\Projects\OrganizationChart\OrganizationChart\Database.json";
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public JsonResult GetTree()
        {       
            var list = JsonConvert.DeserializeObject<List<Tree>>(System.IO.File.ReadAllText(DATABASE));           
            return Json(list,JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult SaveTree(Tree obj)
        {
            var list = JsonConvert.DeserializeObject<List<Tree>>(System.IO.File.ReadAllText(DATABASE));
            list.Add(obj);
            var json = JsonConvert.SerializeObject(list);
            System.IO.File.WriteAllText(DATABASE, json);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteTree()
        {
            return null;
        }

       
    }
}