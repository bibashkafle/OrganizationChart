namespace OrganizationChart.Models
{
    public class Tree
    {
        public string NodeId { get; set; }
        public string ParentNodeId { get; set; }
        public string NodeText { get; set; }
        public string Tooltip { get; set; }
        public bool IsLeaf { get; set; }

        public Tree(int node, int parentNode, string nodeText, string tooltip, bool isLeaf)
        {
            NodeId = node.ToString();
            ParentNodeId = parentNode.ToString();
            NodeText = nodeText;
            Tooltip = tooltip;
            IsLeaf = isLeaf;//.ToLower().Equals("true") ? true : false;
        }
    }
}