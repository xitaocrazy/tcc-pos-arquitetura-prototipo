import React from "react";
import { MobileView, BrowserView } from "react-device-detect"
import SearchForm from "./SearchForm";

const HeaderList = props => (
  <>
    <MobileView>
      <div className="d-flex flex-column align-items-center">
        <div className="p2 col-example d-flex flex-row pb-3">
          <SearchForm />
        </div>
      </div>
    </MobileView>
    <BrowserView>
      <div className="d-flex flex-column flex-lg-row flex-xl-row align-items-center justify-content-between">
        <div className="p2 d-flex flex-column flex-md-row pb-3">
          <div>
            <SearchForm />
          </div>
        </div>
      </div>
    </BrowserView>
  </>
);

export default HeaderList;
