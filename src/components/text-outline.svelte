<script lang="ts">
    /**
     * A dynamically created component for text styling. 
     * I inted to use it to create outlines around text in header elements.
     * This will be an alternative to using text-shadow CSS and should scale better with dynamic font-sizes.
     */
    export let text: string; // Whatever text you want to display with the fancy styles you provide.
    export let fontSize: number;
    export let fill: string;
    export let stroke: string;
    export let strokeWidth: number;
</script>


<svg  width="100%" viewBox="0 0 100 100">
    <text x=0 y=20 font-size={fontSize} fill={fill} stroke={stroke} stroke-width={strokeWidth}>
        {text}
    </text>
</svg>