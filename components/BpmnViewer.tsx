"use client";
import React, { useEffect, useRef } from "react";
import BpmnJS from "bpmn-js";

const BpmnViewer = ({ url }: { url: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const viewer = new BpmnJS({ container: containerRef.current! });
    let cancelled = false;

    fetch(url)
      .then((res) => res.text())
      .then((xml) => {
        if (cancelled) return;
        viewer.importXML(xml);
      });

    return () => {
      cancelled = true;
      viewer.destroy();
    };
  }, [url]);

  return <div style={{ width: "100%", height: 500 }} ref={containerRef} />;
};

export default BpmnViewer;
