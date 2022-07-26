import dynamic from "next/dynamic";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import DataFormer from "../lib/data-former";
import Button, { ButtonSize } from "../components/Button";
import DropDown from "@/components/DropDown";
import Spacer from "@/components/Spacer";

const ForceGraph = dynamic(() => import("../components/ForceGraph"), {
  ssr: false,
});

const get_kanaka = gql`
  query kanakaByXrefidRelations($xref_id: String!) {
    kanaka(where: {xref_id: {_eq: $xref_id}}) {
      kanaka_id
      name
      sex
      residence
      birth_date
      birth_place
      xref_id
      mookuauhau_id
      namakua {
        ohana {
          ohana_id
          xref_id
          kane_id
          wahine_id
          kane {
            kanaka_id
            xref_id
            name
          }
          wahine {
            kanaka_id
            xref_id
            name
          }
        }
      }
      makuakane {
        ohana_id
        xref_id
        kane_id
        wahine {
          kanaka_id
          name
          xref_id
        }
        nakamalii {
          kamalii_id
          ohana {
            ohana_id
            xref_id
          }
          kanaka {
            kanaka_id
            name
            xref_id
            sex
          }
        }
      }
      makuahine {
        ohana_id
        xref_id
        wahine_id
        kane {
          kanaka_id
          name
          xref_id
        }
        nakamalii {
          kamalii_id
          kanaka {
            kanaka_id
            name
            xref_id
            sex
          }
        }
      }
    }
  }
`;

const get_kanaka_ascendants = gql`
query kanakaByXrefidRelations($xref_id: String!) {
  kanaka(where: {xref_id: {_eq: $xref_id}}) {
    namakua {
      ohana {
        ohana_id
        xref_id
        kane_id
        wahine_id
        kane {
          kanaka_id
          xref_id
          name
        }
        wahine {
          kanaka_id
          xref_id
          name
        }
      }
    }
  }
}
`;

export default function Home() {
  const [graphData, setGraphData] = useState<any>({ nodes: [], links: [] });
  const [algo, setAlgo] = useState<any>('td');
  const formatter = new DataFormer();
  let subGraph: {[k: string]: any} = {};

  const [loadKanakaDescendants] = useLazyQuery(get_kanaka, {
      onCompleted: (data) => {
        subGraph = formatter.formatDescendantData(data);
        console.log("new desc subgraph: ", subGraph)

        setGraphData({
          nodes: formatter.getUniqNodes([...graphData.nodes, ...subGraph.nodes]),
          links: [...graphData.links, ...subGraph.links ]
        });
      },
    }
  );

  const [loadKanakaAscendants] = useLazyQuery(get_kanaka_ascendants, { //only works well with reac-force-graph radial visualization algorithms
      onCompleted: (data) => {
        subGraph = formatter.formatAscendantData(data);
        console.log("new asc subgraph: ", subGraph)
        setGraphData({
          nodes: [subGraph.nodes],
          links: [subGraph.links ]
        });
      },
    }
  );

  const handleDropDown = (o) => setAlgo(o);

  return (
    <div>
      <div className="button-rack">
        <Button
          size={ButtonSize.Small}
          customWidth="15rem"
          onClick={() => loadKanakaDescendants({variables: {xref_id: "@I1749@"}})}
          type="submit"
        >Kamehameha I</Button>
        <Spacer size={50} axis={'horizontal'} />
        <Button
          size={ButtonSize.Small}
          customWidth="15rem"
          onClick={() => loadKanakaDescendants({variables: {xref_id: "@I489@"}})}
          type="submit"
        >Kekaulike Kalani-kui-hono-i-ka-moku (King of Maui)</Button>
        <Spacer size={50} axis={'horizontal'} />
        <Button
          size={ButtonSize.Small}
          customWidth="15rem"
          onClick={() => loadKanakaDescendants({variables: {xref_id: "@I21@"}})}
          type="submit"
        >Wakea</Button>
        <Spacer size={50} axis={'horizontal'} />
        <DropDown 
          name="Visualization Algo"
          onClick={(e) => handleDropDown(e)}
          width="15rem"
        />
      </div>
      <ForceGraph
        nodeAutoColorBy={"__typename"}
        nodeLabel={"name"}
        graphData={graphData}
        minZoom={3}
        maxZoom={6}
        dagMode={algo}
        dagLevelDistance={40}
        onDagError={() => {return "DAG Error"}}
        onNodeClick={(node: any, event) => {
          console.log(node)
          if (node.__typename === 'kanaka') {
            loadKanakaDescendants({ variables: {xref_id: node.id}});
          }
          if (node.index === 0) {
            loadKanakaAscendants({ variables: {xref_id: node.id}});
          }
        }}
      />
      <style jsx>{`
        .button-rack {
            display: flex;
            padding: 15px;
            justify-content: center; 
        `}
      </style>
    </div>
  );
}
