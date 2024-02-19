import React from "react";
import Header from "../../Components/Header/Header";
import GridView from "../../Components/Quickinfo/GridView";
import AgentGridView from './AgentGridView'

function AgentPropertyListing({ nextStep }) {
  return (
    <div>
      <div>
        <div class="card-listing-section">
          <div class="ml-3">
            <AgentGridView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentPropertyListing;
