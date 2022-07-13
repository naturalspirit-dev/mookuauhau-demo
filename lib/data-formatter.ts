const getUniqNodes = (data) => {
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
    
const pushNode = (nodes, name, id, color, __typename) => {
    console.log(nodes, typeof nodes)
    return nodes.push({
        name: name,
        id: id,
        color: color,
        __typename: __typename
    });
}

const pushLink = (links, source, target, color) => {
    return links.push({
        source: source,
        target: target,
        color: color
    });
}
    
const formatData = (data) => {
    if (!data.kanaka) return ReferenceError;
    let descendants = { nodes: [], links: [] }
    let ascendants = { nodes: [], links: [] }

        console.log(descendants.nodes)
    //kanaka
    descendants.nodes = pushNode(descendants.nodes, data.kanaka[0].name.replaceAll("/",""), data.kanaka[0].xref_id, "#CB6A13", data.kanaka[0].__typename)
    
    //makuakane
    if (data.kanaka[0].makuakane) {
        data.kanaka[0].makuakane.map((item) => {
            //create ohana node
            if(item.__typename === "ohana") {
                console.log("pushing: ", "Ohana", item.ohana_id, "#bfbf15", item.__typename)
                descendants.nodes = pushNode(descendants.nodes, "Ohana", item.ohana_id, "#bfbf15", item.__typename);
                descendants.links = pushLink(descendants.links, data.kanaka[0].xref_id, item.ohana_id, "#bfbf15");
            }
            //create wife node
            if (item.wahine) {
                descendants.nodes = pushNode(descendants.nodes, item.wahine.name.replaceAll("/",""), item.wahine.xref_id, "#b53312", item.wahine.__typename);
                descendants.links = pushLink(descendants.links, item.ohana_id, item.wahine.xref_id, "#b53312");
            }
            //create kids nodes
            if (item.nakamalii) {
                item.nakamalii.map((kamalii) => {
                    descendants.nodes = pushNode(descendants.nodes, kamalii.kanaka.name.replaceAll("/",""), kamalii.kanaka.xref_id, "#cbac13", kamalii.__typename);
                    descendants.links = pushLink(descendants.links, item.ohana_id, kamalii.kanaka.xref_id, "#cbac13");
                });
            }
        });
    }

    //makuahine
    if (data.kanaka[0].makuahine) {
        data.kanaka[0].makuahine.map((item) => {
            //create ohana node
            if(item.__typename === "ohana") {
                descendants.nodes = pushNode(descendants.nodes, "Ohana", item.ohana_id, "#bfbf15", item.__typename);
                descendants.links = pushLink(descendants.links, data.kanaka[0].xref_id, item.ohana_id, "#bfbf15");
            }
            //create husband node
            if (item.kane) {
                descendants.nodes = pushNode(descendants.nodes, item.kane.name.replaceAll("/",""), item.kane.xref_id, "#b53312", item.kane.__typename);
                descendants.links = pushLink(descendants.links, item.ohana_id, item.kane.xref_id, "#b53312");
            }
            //create kids nodes
            if (item.nakamalii) {
                item.nakamalii.map((kamalii) => {
                    descendants.nodes = pushNode(descendants.nodes, kamalii.kanaka.name.replaceAll("/",""), kamalii.kanaka.xref_id, "#cbac13", kamalii.kanaka.__typename);
                    descendants.links = pushLink(descendants.links, item.ohana_id, kamalii.kanaka.xref_id, "#cbac13")
                });
            }
        });
    }

    // namakua
    if(data.kanaka[0].namakua) {
        if(data.kanaka[0].namakua[0].ohana) {
            //ohana
            ascendants.nodes = pushNode(ascendants.nodes, "Ohana", data.kanaka[0].namakua[0].ohana.ohana_id, "#bfbf15", "ohana");
            ascendants.links = pushLink(ascendants.links, data.kanaka[0].xref_id, data.kanaka[0].namakua[0].ohana.ohana_id, "#bfbf15");
            //kane
            if (data.kanaka[0].namakua[0].ohana.kane) {
                ascendants.nodes = pushNode(ascendants.nodes, data.kanaka[0].namakua[0].ohana.kane.name, data.kanaka[0].namakua[0].ohana.kane.xref_id, "#f56f42", "kanaka");
                ascendants.links = pushLink(ascendants.links, data.kanaka[0].namakua[0].ohana.ohana_id, data.kanaka[0].namakua[0].ohana.kane.xref_id, "#f56f42"); 
            }
            //waascendants.nodes =hine
            if (data.kanaka[0].namakua[0].ohana.wahine) {
                ascendants.nodes = pushNode(ascendants.nodes, data.kanaka[0].namakua[0].ohana.wahine.name, data.kanaka[0].namakua[0].ohana.wahine.xref_id, "#b53312", "kanaka");
                ascendants.links = pushLink(ascendants.links, data.kanaka[0].namakua[0].ohana.ohana_id, data.kanaka[0].namakua[0].ohana.wahine.xref_id, "#b53312"); 
            }
        }
    }

    descendants = { nodes: getUniqNodes(descendants.nodes), links: descendants.links };
    ascendants = { nodes: getUniqNodes(ascendants.nodes), links: ascendants.links };

    return { descendants, ascendants };
}

export default formatData;