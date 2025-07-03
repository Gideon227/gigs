"use client"
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import debounce from 'lodash.debounce'

interface CustomSalarySliderProps {
    min?: number;
    max?: number;
    defaultValue?: [number, number];
    disabled?: boolean;
    onChangeCommitted: (value: [number, number]) => void;
    currentMinSalary?: number;
    currentMaxSalary?: number
}

const CustomSalarySlider = ({
    min = 0,
    max = 1000000,
    defaultValue = [60000, 210000],
    disabled = false,
    onChangeCommitted,
    currentMinSalary,
    currentMaxSalary
}: CustomSalarySliderProps) => {
    const [currentValue, setCurrentValue] = useState<[number, number]>(defaultValue);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const handleRefs = [useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null)];

    useEffect(() => {
        if (
            currentMinSalary !== undefined &&
            currentMaxSalary !== undefined
        ) {
            setCurrentValue([currentMinSalary, currentMaxSalary]);
        }
    }, [currentMinSalary, currentMaxSalary]);


    const debounceRef = useRef<ReturnType<typeof debounce> | null>(null);

    const handleChange = useCallback((value: number | number[]) => {
        if (!Array.isArray(value)) return; 
        setCurrentValue(value as [number, number]);
        if (debounceRef.current) debounceRef.current.cancel();

        debounceRef.current = debounce((val: [number, number]) => {
            onChangeCommitted(val);
        }, 3000);

        debounceRef.current(value as [number, number]);
    }, [onChangeCommitted]);

    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                debounceRef.current.cancel();
            }
        };
    }, []);

    const marks = useMemo(
        () => ({
        [min]: `$${min.toLocaleString()}`,
        [max]: `$${max.toLocaleString()}`,
        }),
        [min, max]
    );

    const CustomHandle = (node: any, props: any) => {
        const { value, dragging, index, style, ...restProps } = props;

        const ref = handleRefs[index];
        const coloredNode = React.cloneElement(node, {
            ref,
            style: {
            ...node.props.style,
            backgroundColor: "#D1FF17",
            border: "3px solid #364300",
            width: 20,
            height: 20,
            },
        });

        return coloredNode
    }

    const renderLabels = () => {
        if (!containerRef.current) return null;

        return currentValue.map((val, idx) => {
        const handle = handleRefs[idx].current;
        if (!handle || !containerRef.current) return null;

        const handleRect = handle.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const left = handleRect.left - containerRect.left + handleRect.width / 2;

        return (
            <div
            key={idx}
            style={{
                position: "absolute",
                top: 30,
                left,
                transform: "translateX(-50%)",
                fontSize: 14,
                color: "#FCFCFC",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 10,
            }}
            >
            ${val.toLocaleString()}
            </div>
        );
        });
    };

  return (
    <div ref={containerRef} style={{ position: "relative", paddingBottom: 35 }}>
            {renderLabels()}
            <Slider 
                range
                min={min}
                max={max}
                // defaultValue={defaultValue}
                value={currentValue}
                allowCross={false}
                disabled= {disabled}
                marks={{}}
                onChange={handleChange}
                styles= {{
                    track: { backgroundColor: '#D1FF17', height: 3 },
                    rail: { backgroundColor: '#363636', height: 3 },
                    handle: {
                        backgroundColor: '#D1FF17',
                        borderColor: '#364300',
                        height: 20,
                        width: 20,
                        borderWidth: 3,
                        marginTop: -9
                    }      
                }}
                handleRender={(node, props) => CustomHandle(node, props)}
            />
    </div>
)}
export default CustomSalarySlider;