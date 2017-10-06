using System;
using System.Collections.Generic;
using OrganizationChart.Models;
using OrganizationChart.Repository;

namespace OrganizationChart.Service
{
    public class TreeOperation : ITreeOperation
    {
        Database _database;
        public TreeOperation()
        {
            _database = Database.GetInstance();
        }
        public List<Tree> AddNode(Tree node)
        {
            return _database.GetTree();
        }

        public List<Tree> DeleteNode(Tree node)
        {
            return _database.GetTree();
        }

        public List<Tree> EditNode(Tree node)
        {
            return _database.GetTree();
        }

        public List<Tree> GetTree()
        {
            return _database.GetTree();
        }
    }
}