export function mapConfig(config: object) {
    var mappedConfig = Object.keys(config).map(key => {
        switch(key) {
            case "nodeCaption":
                return Object.keys(config[key]).map(label => {
                    return {
                        selector: 'node[label="' + label + '"]',
                        style: {
                            label: 'data(' + config[key][label] + ')'
                        }
                    }
                })
            case "nodeColor":
                return Object.keys(config[key]).map(label => {
                    return {
                        selector: 'node[label="' + label + '"]',
                        style: {
                            'background-color': config[key][label]
                        }
                    }
                })
            case "nodeSize":
                return Object.keys(config[key]).map(label => {
                    return {
                        selector: 'node[label="' + label + '"]',
                        style: {
                            'width': config[key][label],
                            'height': config[key][label]
                        }
                    }
                })
            case "nodeCaptionSize":
                return Object.keys(config[key]).map(label => {
                    return {
                        selector: 'node[label="' + label + '"]',
                        style: {
                            'font-size': config[key][label]
                        }
                    }
                })
        }
    })

    return [
        {
            selector: 'node[title]',
            style: {
                label: 'data(title)'
            }
        },
        {
            selector: 'node[name]',
            style: {
                label: 'data(name)'
            }
        },
        ...mappedConfig.flat(), {
            selector: ".center-center",
            style: {
                "background": "black",
                "text-valign": "center",
                "text-halign": "center"
            }
        }]
}