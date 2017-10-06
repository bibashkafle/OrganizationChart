using System.Collections.Generic;
using OrganizationChart.Models;

namespace OrganizationChart.Repository
{
    interface IDatabase
    {
        List<Tree> GetTree();
        void SaveTree(List<Tree> list);      

    }
}
