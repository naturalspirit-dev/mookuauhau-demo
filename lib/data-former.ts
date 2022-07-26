class DataFormer {
    nodes: Array<any> = [];
    links: Array<any> = [];

    constructor() {
        this.nodes = [];
        this.links = [];
    }

    uniqNodesLocal = () => {
        let map = {};
        let newNodes = [];
        this.nodes.map(a => {
          if (!map[a.id]) {
            newNodes.push(a);
            map[a.id] = true;
          }
        });
        return newNodes;
    }

    getUniqNodes = (data) => {
        let map = {};
        let newNodes = [];
        data.map(a => {
          if (!map[a.id]) {
            newNodes.push(a);
            map[a.id] = true;
          }
        });
        return newNodes;
    }
      
    pushNode = (name, id, color, __typename) => {
        this.nodes.push({
            name: name,
            id: id,
            color: color,
            __typename: __typename
        });
    }

    pushLink = (source, target, color) => {
        this.links.push({
            source: source,
            target: target,
            color: color
        });
    }
      
    formatDescendantData = (data): any => {
        if (!data.kanaka) return ReferenceError;
        // this.nodes = [], this.links = [];

        //namakua
        if(data.kanaka[0].namakua) {
            if(data.kanaka[0].namakua[0].ohana) {
                //ohana
                this.pushNode("Ohana", data.kanaka[0].namakua[0].ohana.ohana_id, "#bfbf15", "ohana");
                this.pushLink(data.kanaka[0].xref_id, data.kanaka[0].namakua[0].ohana.ohana_id, "#bfbf15");
                //kane
                if (data.kanaka[0].namakua[0].ohana.kane) {
                    this.pushNode(data.kanaka[0].namakua[0].ohana.kane.name, data.kanaka[0].namakua[0].ohana.kane.xref_id, "#f56f42", "kanaka");
                    this.pushLink(data.kanaka[0].namakua[0].ohana.ohana_id, data.kanaka[0].namakua[0].ohana.kane.xref_id, "#f56f42"); 
                }
                //wahine
                if (data.kanaka[0].namakua[0].ohana.wahine) {
                    this.pushNode(data.kanaka[0].namakua[0].ohana.wahine.name, data.kanaka[0].namakua[0].ohana.wahine.xref_id, "#ab3f5c", "kanaka");
                    this.pushLink(data.kanaka[0].namakua[0].ohana.ohana_id, data.kanaka[0].namakua[0].ohana.wahine.xref_id, "#ab3f5c"); 
                }
            }
        }
  
        //kanaka
        this.pushNode(data.kanaka[0].name.replaceAll("/",""), data.kanaka[0].xref_id, "#CB6A13", data.kanaka[0].__typename)

        //makuakane
        if (data.kanaka[0].makuakane) {
            data.kanaka[0].makuakane.map((item) => {
                //create ohana node
                if(item.__typename === "ohana") {
                    this.pushNode("Ohana", item.ohana_id, "#bfbf15", item.__typename);
                    this.pushLink(data.kanaka[0].xref_id, item.ohana_id, "#bfbf15");
                }
                //create wife node
                if (item.wahine) {
                    this.pushNode(item.wahine.name.replaceAll("/",""), item.wahine.xref_id, "#b53312", item.wahine.__typename);
                    this.pushLink(item.ohana_id, item.wahine.xref_id, "#b53312");
                }
                //create kids nodes
                if (item.nakamalii) {
                    item.nakamalii.map((kamalii) => {
                        this.pushNode(kamalii.kanaka.name.replaceAll("/",""), kamalii.kanaka.xref_id, "#cbac13", kamalii.__typename);
                        this.pushLink(item.ohana_id, kamalii.kanaka.xref_id, "#cbac13")
                    });
                }
            });
        }

        //makuahine
        if (data.kanaka[0].makuahine) {
            data.kanaka[0].makuahine.map((item) => {
                //create ohana node
                if(item.__typename === "ohana") {
                    this.pushNode("Ohana", item.ohana_id, "#bfbf15", item.__typename);
                    this.pushLink(data.kanaka[0].xref_id, item.ohana_id, "#bfbf15");
                }
                //create husband node
                if (item.kane) {
                    this.pushNode(item.kane.name.replaceAll("/",""), item.kane.xref_id, "#b53312", item.kane.__typename);
                    this.pushLink(item.ohana_id, item.kane.xref_id, "#b53312");
                }
                //create kids nodes
                if (item.nakamalii) {
                    item.nakamalii.map((kamalii) => {
                        this.pushNode(kamalii.kanaka.name.replaceAll("/",""), kamalii.kanaka.xref_id, "#cbac13", kamalii.kanaka.__typename);
                        this.pushLink(item.ohana_id, kamalii.kanaka.xref_id, "#cbac13")
                    });
                }
            });
        }
        
        return { nodes: this.uniqNodesLocal(), links: this.links };
    }

    formatAscendantData = (data) => {
        if (!data.kanaka) return ReferenceError;

        //namakua
        if(data.kanaka[0].namakua) {
            if(data.kanaka[0].namakua[0].ohana) {
                //ohana
                this.pushNode("Ohana", data.kanaka[0].namakua[0].ohana.ohana_id, "#bfbf15", "ohana");
                this.pushLink(data.kanaka[0].xref_id, data.kanaka[0].namakua[0].ohana.ohana_id, "#bfbf15");
                //kane
                if (data.kanaka[0].namakua[0].ohana.kane) {
                    this.pushNode(data.kanaka[0].namakua[0].ohana.kane.name, data.kanaka[0].namakua[0].ohana.kane.xref_id, "#f56f42", "kanaka");
                    this.pushLink(data.kanaka[0].namakua[0].ohana.ohana_id, data.kanaka[0].namakua[0].ohana.kane.xref_id, "#f56f42"); 
                }
                //wahine
                if (data.kanaka[0].namakua[0].ohana.wahine) {
                    this.pushNode(data.kanaka[0].namakua[0].ohana.wahine.name, data.kanaka[0].namakua[0].ohana.wahine.xref_id, "#b53312", "kanaka");
                    this.pushLink(data.kanaka[0].namakua[0].ohana.ohana_id, data.kanaka[0].namakua[0].ohana.wahine.xref_id, "#b53312"); 
                }
            }
        }

        return { nodes: this.uniqNodesLocal(), links: this.links };
    }
}

export default DataFormer;