using System;
using System.Collections.Generic;
using System.Configuration;
using Newtonsoft.Json;
using OrganizationChart.Models;

namespace OrganizationChart.Repository
{
    public sealed class Database : IDatabase
    {
        private static Database _obj;
        private readonly string filePath;
        Database(){
            filePath = ConfigurationManager.AppSettings["Database"];            
        }

        public static Database GetInstance()
        {
            if (_obj == null)
                _obj = new Database();

            return _obj;
        }
       

        public List<Tree> GetTree()
        {
            var list = JsonConvert.DeserializeObject<List<Tree>>(System.IO.File.ReadAllText(filePath));
            return list;
        }

        public void SaveTree(List<Tree> list)
        {
            var json = JsonConvert.SerializeObject(list);
            System.IO.File.WriteAllText(filePath, json);
        }
    }
}