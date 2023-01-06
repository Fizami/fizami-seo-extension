document.addEventListener('DOMContentLoaded', () => {
    init();
});

const init = () => {
    document.addEventListener("click", selectTool);
    document.addEventListener("click", getMobileFriendly);
    document.addEventListener("click", getMetaTags);
    document.addEventListener("click", getKeywordSearch);
    document.addEventListener("click", getSEOExtraction);
    document.addEventListener("change", disableInput);
    setForm(urlForm('MobileFriendly'));
    setContent(mobileFriendly);
};

const selectTool = (evt) => {
    if (evt.target.closest('#mobile-friendly')){
        toogle('mobile-friendly');
        setForm(urlForm('MobileFriendly'));
        setContent(mobileFriendly);
    } else if (evt.target.closest('#meta-tags')){
        toogle('meta-tags');
        setForm(urlForm('MetaTags'));
        setContent(metaTags);
    } else if (evt.target.closest('#keyword-search')){
        toogle('keyword-search');
        setForm(queryForm);
        setContent(keywordSearch);
    } else if (evt.target.closest('#seo-extraction')){
        toogle('seo-extraction');
        setForm(urlForm('SEOExtraction'));
        setContent(seoExtraction);
    }
}

const setForm = (form) => document.querySelector('#freetool-form').innerHTML = form;
const setContent = (content) => document.querySelector('#freetool-content').innerHTML = content;

const toogle = (name) => {
    oldElement = document.querySelector('li a.active');
    oldElement.classList.remove('active');
    newElement = document.querySelector(`#${name}`);
    newElement.classList.add('active');
}

const swalErrorMsj = (text) => {
    Swal.fire(
        'Oops...',
        text,
        'error'
    )
};

const cardInfo = (key, value) => {
    return `
        <blockquote class="blockquote mb-0">
            <h5>${key}</h5>
            <p>${value}</p>
        </blockquote>
    `;
};

const cardImage = (key, value) => {
    return `
        <div class="text-center">
            <h5>${key}</h5>
            <img src="${value}" class="rounded img-fluid" alt="${key}">
        </div>
    `;
};

const cardList = (key, value) => {
    return `
        <blockquote class="blockquote mb-0">
            <h5>${key}</h5>
            <ul>${value}</ul>
        </blockquote>
    `;
};

const disableInput = evt => {
    const { target } = evt;
    if(target.closest("[name='radioKeywordSearch']")){
        $('#query').prop( "disabled", target.closest("#radioTrending"));
    }
};

const getMobileFriendly = async evt => {
    const { target } = evt;
    if(target.closest('#btnMobileFriendly')){
        const url =  $("#urlMobileFriendly").val();
        $('#result').html('');

        let expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        let regex = new RegExp(expression);

        if (url.match(regex)) {
            try {
                // Colocar el componente de carga
                $('#btnMobileFriendly').attr('disabled', true).html('Loading...')

                const fetchToMobileFriendly = 'https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run?key=AIzaSyDsG72dC5wpRNHIIBypo5gZvqg2TemD1Jc';

                const response = await axios.post(fetchToMobileFriendly, {
                    'url': url,
                    'requestScreenshot': true,
                },{
                    headers: { 
                        'Content-Type': 'application/json'
                    }
                });
                
                // Quitar el componente de carga
                $('#btnMobileFriendly').attr('disabled', false).html('Analyze')

                const mobileFriendliness = (title, body) => {
                    const meses = {1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"}
                    const fecha = new Date();
                    
                    return `
                        <h4>Last test: ${meses[fecha.getMonth()+1]} ${fecha.getDate()}, ${fecha.getFullYear()} at ${fecha.getHours() < 10 ? '0' + fecha.getHours() : fecha.getHours()}:${fecha.getMinutes() < 10 ? '0' + fecha.getMinutes() : fecha.getMinutes()}</h4>
                        <div>
                            <h3 class="text-warning">${title}</h3>
                            <p>${body}</p>
                        </div>
                    `
                };

                if (response !== undefined) {
                    if(response.status === 200) {
                        const status = response.data.testStatus.status;
                        if(status === 'COMPLETE'){
                            switch (response.data.mobileFriendliness) {
                                case 'MOBILE_FRIENDLY':
                                    $('#mobileFriendliness').html(mobileFriendliness('The page is optimized for mobile devices.', 'This page is easy to use on mobile devices.'));
                                    break;
                                case 'NOT_MOBILE_FRIENDLY':
                                    $('#mobileFriendliness').html(mobileFriendliness('The page is not optimized for mobile devices.', 'This page is not easy to use on mobile devices.'));
                                    break;
                                default:
                                    $('#mobileFriendliness').html(mobileFriendliness('Internal error running this test. Try running the test again.', 'Apparently an error occurred during testing. Please try again.'));
                                    break;
                            }
                            if (response.data.hasOwnProperty('mobileFriendlyIssues')) {
                                let rules = "";
                                response.data.mobileFriendlyIssues.forEach(element => {
                                    switch (element.rule) {
                                        case 'USES_INCOMPATIBLE_PLUGINS':
                                            rules += cardInfo("USES INCOMPATIBLE PLUGINS", "Plugins incompatible with mobile devices are being used.")
                                            break;
                                        case 'CONFIGURE_VIEWPORT':
                                            rules += cardInfo("CONFIGURE VIEWPORT", "Viewport is not specified using the meta viewport tag.")
                                            break;
                                        case 'FIXED_WIDTH_VIEWPORT':
                                            rules += cardInfo("FIXED WIDTH VIEWPORT", "Viewport defined to a fixed width.")
                                            break;
                                        case 'SIZE_CONTENT_TO_VIEWPORT':
                                            rules += cardInfo("SIZE CONTENT TO VIEWPORT", "Content not sized to viewport.")
                                            break;
                                        case 'USE_LEGIBLE_FONT_SIZES':
                                            rules += cardInfo("USE LEGIBLE FONT SIZES", "Font size is too small for easy reading on a small screen.")
                                            break;
                                        case 'TAP_TARGETS_TOO_CLOSE':
                                            rules += cardInfo("TAP TARGETS TOO CLOSE", "Touch elements are too close to each other.")
                                            break;
                                        default:
                                            rules += cardInfo("MOBILE FRIENDLY RULE UNSPECIFIED", "Unknown rule. Sorry, we don't have any description for the rule that was broken.")
                                            break;
                                    }
                                });
                                $('#result').html(rules);
                            }
                            $('#image').attr('src', 'data:' + response.data.screenshot.mimeType + ';base64,' + response.data.screenshot.data);
                            $('#mobile-images').removeClass('invisible');
                        } else if (status === 'PAGE_UNREACHABLE') {
                            swalErrorMsj(`Google cannot access the <strong>URL</strong> because of a user error such as a <strong>robots.txt</strong> blockage, a <strong>403</strong> or <strong>500</strong> code etc. Please make sure that the <strong>URL</strong> provided is accessible by Googlebot and is not password protected.`);
                        } else if (status === 'TEST_STATUS_UNSPECIFIED'){
                            swalErrorMsj(`Internal error when running this test. Please try running the test again.`)
                        } else if (status === 'INTERNAL_ERROR'){
                            swalErrorMsj(`Inspection terminated in an error state. This indicates a problem in Google's infrastructure, not a user error. Please try again later.`)
                        }
                    }
                }
              
            } catch (error) {
                // Quitar el componente de carga
                $('#btnMobileFriendly').attr('disabled', false).html('Analyze')
                // Mostrar error
                swalErrorMsj('The API that this service consumes has problems. Please try again later.');
                console.error(error);
            }
        } else {
            swalErrorMsj('The value entered is not a valid URL.');
        }
    }
};


const getMetaTags = async evt => {
    const { target } = evt;
    if(target.closest('#btnMetaTags')){
        const url =  $("#urlMetaTags").val();

        let expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        let regex = new RegExp(expression);

        if (url.match(regex)) {
           
            try {
                // Colocar el componente de carga
                $('#btnMetaTags').attr('disabled', true).html('Loading...')
                
                const fetchToMeta = 'https://api.urlmeta.org/?url=' + url;
                const authorization = 'Basic bGF6YXJvbWVyOTdAZ21haWwuY29tOjdJdTV1Z3hpZWZ1YkVVa3dobllO'

                const response = await axios.get(fetchToMeta, {
                    headers: { 
                        Authorization: authorization
                    }
                });
                
                // Quitar el componente de carga
                $('#btnMetaTags').attr('disabled', false).html('Analyze')

                if (response !== undefined) {
                    if(response.status === 200) {
                        let { data } = response;
                        let infoText = '';
                        let infoImage = '';
                        if (data.result.status === 'OK') {
                            if (data.meta.title) {
                                infoText += cardInfo('Title', data.meta.title);
                            }
                            if (data.meta.description) {
                                infoText += cardInfo('Description', data.meta.description);
                            }
                            if (data.meta.keywords) {
                                let keys = ''
                                data.meta.keywords.forEach(element => {
                                    if (keys === '') {
                                        keys += element;
                                    } else {
                                        keys += `, ${element}`;
                                    }
                                })
                                infoText += cardInfo('Keywords', keys);
                            }
                            if (data.meta.author) {
                                infoText += cardInfo('Author', data.meta.author);
                            }
                            if (data.meta.type) {
                                infoText += cardInfo('Type', data.meta.type);
                            }
                            if (data.meta.locale) {
                                infoText += cardInfo('Locale', data.meta.locale);
                            }
                            if (data.meta.site.canonical) {
                                infoText += cardInfo('Canonical', data.meta.site.canonical);
                            }
                            if (data.meta.site.cms) {
                                infoText += cardInfo('CMS', data.meta.site.cms);
                            }
                            if (data.meta.site.favicon) {
                                infoText += cardInfo('Favicon', data.meta.site.favicon);
                            }
                            if (data.meta.site.logo) {
                                infoText += cardInfo('Logo', data.meta.site.logo);
                            }
                            if (data.meta.site.name) {
                                infoText += cardInfo('Name', data.meta.site.name);
                            }
                            if (data.meta.image) {
                                infoImage += cardImage('Image', data.meta.image, 150, 200);
                            } else {
                                infoImage += cardImage('Image', '../img/no-image.png', 150, 200);
                            }
                            $('#images').html(infoImage);
                            $('#result').html(infoText);
                        } else {
                            swalErrorMsj(data.result.reason);;
                        }
                    }  
                } 
            } catch (error) {
                // Quitar el componente de carga
                $('#btnMetaTags').attr('disabled', false).html('Analyze')
                // Mostrar error
                swalErrorMsj('The API that this service consumes has problems. Please try again later.');
                console.error(error);
            }
        } else {
            swalErrorMsj('The value entered is not a valid URL.');
        }
    }
};


const getKeywordSearch = async evt => {
    const { target } = evt;
    if(target.closest('#btnKeywordSearch')){
        const valueRadioBtn = document.querySelector("[type='radio']:checked").value;
        const query =  $("#query").val().trim();
        
        const cardInfo = (value) => {
            return `
                <blockquote class="blockquote mb-0">
                    <h5>${value}</h5>
                </blockquote>
            `;
        };

        if (query || valueRadioBtn==='trending') {
            try {
                // Colocar el componente de carga
                $('#btnKeywordSearch').attr('disabled', true).html('Loading...')
                console.log('valueRadioBtn', valueRadioBtn);
                console.log('query', query);
                console.log('STARTED');
                var options = {
                    method: 'GET',
                    url: `https://webit-keyword-search.p.rapidapi.com/${valueRadioBtn}/`,
                    params: valueRadioBtn==='trending' ? {language: 'en'} : {language: 'en', q: query.toLowerCase()},
                    headers: {
                      'X-RapidAPI-Key': '235b68a099mshf70d8a476507a8bp148a17jsn50949ab2feb4',
                      'X-RapidAPI-Host': 'webit-keyword-search.p.rapidapi.com'
                    }
                  };

                await axios.request(options).then((response) => {
                    // Quitar el componente de carga
                    $('#btnKeywordSearch').attr('disabled', false).html('Analyze');

                    if (response !== undefined) {
                        if(response.status === 200) {
                            let { data } = response;
                            let infoText = '';
                            if (data.status === 'success') {
                                data.data.results.forEach(item => {
                                    infoText += cardInfo(item)
                                })
                                if(infoText){
                                    $('#result').html(infoText);
                                } else {
                                    swalErrorMsj('No data available for this query.');
                                }
                            } else {
                                swalErrorMsj(`Inspection terminated in an error state. This indicates a problem in service infrastructure, not a user error. Please try again later.`)
                            }
                        }  
                    }
                });

            } catch (error) {
                // Quitar el componente de carga
                $('#btnKeywordSearch').attr('disabled', false).html('Analyze')
                // Mostrar error
                swalErrorMsj('The API that this service consumes has problems. Please try again later.');
                console.error(error);
            }
        } else {
            swalErrorMsj('The query is not valid.');
        }
    }
};


const getSEOExtraction = async evt => {
    const { target } = evt;
    if(target.closest('#btnSEOExtraction')){
        const url =  $("#urlSEOExtraction").val();

        let expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        let regex = new RegExp(expression);

        if (url.match(regex)) {
            try {
                // Colocar el componente de carga
                $('#btnSEOExtraction').attr('disabled', true).html('Loading...')

                let form = new FormData();
                
                form.append('url', url)
                const response = await axios.post(`https://canssens-seo-extraction-v1.p.rapidapi.com/seo/api/`, form, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'x-rapidapi-key': '6cafabdbf4msh0582defb7289be8p1c03a7jsn16b483430969',
                        'x-rapidapi-host': 'canssens-seo-extraction-v1.p.rapidapi.com',
                    }
                });
                
                // Quitar el componente de carga
                $('#btnSEOExtraction').attr('disabled', false).html('Analyze')

                if (response !== undefined) {
                    if(response.status === 200) {
                        let { data } = response;
                        let component1 = '';
                        let component2 = '';
                        let component3 = '';

                        if (data.title) {
                            component1 += cardInfo('Title', data.title);
                        }
                        if (data.url) {
                            component1 += cardInfo('URL', data.url);
                        }
                        if (data.keywords) {
                            component1 += cardInfo('Keywords', data.keywords);
                        }
                        if (data.description) {
                            component1 += cardInfo('Description', data.description);
                        }
                        if (data.og_description) {
                            component1 += cardInfo('Open Graph Description', data.og_description);
                        }
                        if (data.h1) {
                            let h1 = ''
                            data.h1.forEach(element => {
                                h1+=`<li>${element}</li>`
                            })
                            component2 += cardList(`H1 (${data.h1.length})`, h1);
                        }
                        if (data.h2) {
                            let h2 = ''
                            data.h2.forEach(element => {
                                h2+=`<li>${element}</li>`
                            })
                            component2 += cardList(`H2 (${data.h2.length})`, h2);
                        }
                        if (data.h3) {
                            let h3 = ''
                            data.h3.forEach(element => {
                                h3+=`<li>${element}</li>`
                            })
                            component2 += cardList(`H3 (${data.h3.length})`, h3);
                        }
                        if (data.links) {
                            let links = ''
                            data.links.forEach(element => {
                                links+=`<li><a href="${element}" target="_blank">${element}</a></li>`
                            })
                            component3 += cardList(`Links (${data.links.length})`, links);
                        }
                        $('#result-1').html(component1);
                        $('#result-2').html(component2);
                        $('#result-3').html(component3);
                    }
                }
            } catch (error) {
                // Quitar el componente de carga
                $('#btnSEOExtraction').attr('disabled', false).html('Analyze')
                // Mostrar error
                swalErrorMsj('The API that this service consumes has problems. Please try again later.');
                console.error(error);
            }
        } else {
            swalErrorMsj('The value entered is not a valid URL.');
        }
    }
};