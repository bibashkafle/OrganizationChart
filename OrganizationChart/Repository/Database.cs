using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using OrganizationChart.Models;

namespace OrganizationChart.Repository
{
    public class Database : IDatabase
    {
        private static Database _obj;
        private string filePath;
        private Database(){ }

        public static Database GetInstance()
        {
            if (_obj == null)
                _obj = new Database();

            return _obj;
        }
        public List<Tree> AddNode(Tree node)
        {
            throw new NotImplementedException();
        }

        public List<Tree> DeleteNode(Tree node)
        {
            throw new NotImplementedException();
        }

        public List<Tree> EditNode(Tree node)
        {
            throw new NotImplementedException();
        }

        public List<Tree> GetTree()
        {
            var list = JsonConvert.DeserializeObject<List<Tree>>(System.IO.File.ReadAllText(filePath));
            return list;
        }
    }
}