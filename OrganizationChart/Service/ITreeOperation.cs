using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OrganizationChart.Models;

namespace OrganizationChart.Service
{
    interface ITreeOperation
    {
        List<Tree> GetTree();
        List<Tree> AddNode(Tree node);
        List<Tree> EditNode(Tree node);
        List<Tree> DeleteNode(Tree node);
    }
}
