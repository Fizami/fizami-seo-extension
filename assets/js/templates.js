const mobileFriendly = `
    <div class="row">
        <div class="col-md-6 text-center">
            <div id="mobile-images" class="hidden invisible">
                <img id="image" class="rounded img-fluid">
            </div>
        </div>
        <div class="col-md-6 justify-content-center align-self-center">
            <div id="mobileFriendliness"></div>
            <div id="result">
            </div>
        </div>
    </div>
`; 

const metaTags = `
    <div class="row">
        <div class="col-6">
            <div id="images">
            </div>
        </div>
        <div class="col-6">
            <div id="result">
            </div>
        </div>
    </div>
`;

const keywordSearch = `
    <div class="row">
        <div class="col-md-12 justify-content-center align-self-center">
            <div id="result">
            </div>
        </div>
    </div>
`;

const seoExtraction = `
    <div class="row">
        <div class="col-md-4" id="generalInf">
            <div id="result-1">
            </div>
        </div>
        <div class="col-md-4" id="headers">
            <div id="result-2">
            </div>
        </div>
        <div class="col-md-4" id="keywords">
            <div id="result-3">
            </div>
        </div>
    </div>
`;

const urlForm = (tool) => `
    <div class="input-group input-group-sm mb-3">                            
        <input type="text" class="form-control" id="url${tool}" name="url${tool}" placeholder="Enter a URL" aria-label="Enter a URL" aria-describedby="btn${tool}">
        <div class="input-group-append content-btn">
            <button class="btn btn-sm btn-primary" type="button" id="btn${tool}">Analyze</button>
        </div>        
    </div>
`;

const queryForm = `
    <div class="input-group input-group-sm mb-3">
        <input type="text" class="form-control" id="query" name="query" placeholder="Enter a query" aria-label="Enter a query" aria-describedby="btnKeywordSearch">
        <div class="input-group-append content-btn">
            <button class="btn btn-primary" type="button" id="btnKeywordSearch">Analyze</button>
        </div>
    </div>
    <div class="row">
        <div class="col-3"></div>
        <div class="col-2">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="radioKeywordSearch" id="radioAutosuggest" value="autosuggest" checked >
                <label class="form-check-label" for="radioAutosuggest">
                    Autosuggest
                </label>
            </div>
        </div>
        <div class="col-2">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="radioKeywordSearch" id="radioTrending" value="trending">
                <label class="form-check-label" for="radioTrending">
                    Trending
                </label>
            </div>
        </div>
        <div class="col-2">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="radioKeywordSearch" id="radioSearch" value="search">
                <label class="form-check-label" for="radioSearch">
                    Search
                </label>
            </div>
        </div>
        <div class="col-3"></div>
    </div>
`;
