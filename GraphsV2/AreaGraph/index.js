import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import {
    AreaChart,
    Area,
    CartesianGrid,
} from 'recharts';

import WithConfigHOC from '../../HOC/WithConfigHOC';
import WithValiddataHOC from '../../HOC/WithValidationHOC';
import customTooltip from '../Components/utils/RechartsTooltip';
import dataParser from '../utils/DataParser';
import renderLegend from '../Components/utils/Legend';
import config from './default.config';
import xAxis from '../Components/utils/xAxis';
import yAxis from '../Components/utils/yAxis';

const AreaGraph = (props) => {

    const {
        properties,
        height,
        width,
        data,
    } = props;

    const {
        xLabel,
        yLabel,
        xColumn,
        yColumn,
        tooltip,
        legend,
        XAxisLabelConfig,
        margin,
        xLabelRotateHeight,
        dateHistogram,
        xTickFormat,
        yTickFormat,
        linesColumn,
        stacked,
    } = properties;

    const [tooltipKey, setToolTipKey] = useState(-1);

    // Formatting data for direct consumption by Area Graph
    const { parsedData, uniqueKeys: areaKeys } = dataParser({ 
      data, 
      key: linesColumn, 
      xColumn, 
      yColumn,
    });

    const colors = scaleOrdinal(schemeCategory10).range();

    return (
        <AreaChart
            width={width}
            height={height}
            data={parsedData}
            test-data="area-graph"
            margin={margin}
        >
            <CartesianGrid vertical = {false}/>
            {
              xAxis({
                xColumn, 
                xLabel, 
                XAxisLabelConfig, 
                xLabelRotateHeight, 
                xTickFormat, 
                dateHistogram,
              })
            }
            {
              yAxis({
                yLabel,
                yTickFormat,
              })
            }
            {
              renderLegend({
                legend,
                height,
              })
            }
            {
                customTooltip({ tooltip, tooltipKey, yColumn })
            }
            {
                areaKeys.map((areaItem, index) => {
                    const color = colors[index % colors.length];
                    return (
                        <Area
                            type="monotone"
                            key={`area-${index}`} 
                            name={areaItem} 
                            dataKey={areaItem} 
                            onMouseEnter={({name}) => setToolTipKey(name)}
                            onMouseLeave={() => setToolTipKey(-1)}
                            stackId={stacked ? areaKeys.length : index} 
                            stroke={color} 
                            fill={color} 
                        />
                    )
                })
            }
        </AreaChart>
    );
}

AreaGraph.propTypes = {
    configuration: PropTypes.object,
    data: PropTypes.array,
};

export default compose(
    WithValiddataHOC(),
    (WithConfigHOC(config))
)(AreaGraph);
