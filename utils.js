export const background_color = "white";
export const primary_color = "#003262";
export const secondary_color = "#3B7EA1";
export const tertiary_color = "#00A598";
export const quaternary_color = "#FDB515";

const scale_factor = 8;

export function step(e, state, dissappear_funcs, appear_funcs) {
    // assert(dissappear_funcs.length == appear_funcs.length);
    if (e.code == "KeyS") {
        state += 1;
        if (state >= appear_funcs.length) {
            state = state - 1;
        }
    
        const to_remove = dissappear_funcs[state];
        for (let i = 0; i < to_remove.length; i++) {
            to_remove[i]();
        }
    
        const to_draw = appear_funcs[state];
        for (let i = 0; i < to_draw.length; i++) {
            to_draw[i]();
        }
    }

    return state;
}

export function draw_node(rc, ctx, x_small, y_small, radius_small, label, color, fill_color=null) {
    const radius = radius_small * scale_factor;
    const x = x_small * scale_factor;
    const y = y_small * scale_factor;
    ctx.font = "200px Open Sans";
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillStyle = color;
    ctx.fillText(label, x, y);
    if (fill_color) {
        rc.circle(x, y, radius * 2, {
            stroke: color, 
            strokeWidth: 10 * scale_factor,
            fill: fill_color,
            fillStyle: 'zigzag',
            fillWeight: 1 * scale_factor,
            hachureGap: 10 * scale_factor,
            roughness: 0.25 * scale_factor,
        });
    } else {
        rc.circle(x, y, radius * 2, {
            stroke: color, strokeWidth: 10 * scale_factor,
            roughness: 0.25 * scale_factor,
        });
    }
        
    ctx.restore();
}

export function gen_node(gen, x_small, y_small, radius_small, color) {
    const radius = radius_small * scale_factor;
    const x = x_small * scale_factor;
    const y = y_small * scale_factor;
    return gen.circle(x, y, radius * 2, {
        stroke: color, strokeWidth: 10 * scale_factor,
        roughness: 0.25 * scale_factor,
    })
}

export function draw_node_from_gen(rc, ctx, node, x_small, y_small, label, color) {
    const x = x_small * scale_factor;
    const y = y_small * scale_factor;
    ctx.font = "200px Open Sans";
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillStyle = color;
    ctx.fillText(label, x, y);
    rc.draw(node);
    ctx.restore();
}

export function draw_arrow(ctx, fromx_small, fromy_small, tox_small, toy_small, label, arrow_color, label_color) {
    const fromx = fromx_small * scale_factor;
    const fromy = fromy_small * scale_factor;
    const tox = tox_small * scale_factor;
    const toy = toy_small * scale_factor;

    const dx = tox - fromx;
    const dy = toy - fromy;
    const headlen = Math.sqrt(dx * dx + dy * dy) * 0.2; // length of head in pixels
    const angle = Math.atan2(dy, dx);

    ctx.fillStyle = arrow_color;
    ctx.strokeStyle = arrow_color;
    ctx.lineWidth = 10 * scale_factor;
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();

    // find midlle of arrow
    const midx = (fromx + tox) / 2;
    const midy = (fromy + toy) / 2;

    // draw small square
    ctx.fillStyle = label_color;
    ctx.fillRect(midx - (15 * scale_factor), midy - (15 * scale_factor), 30 * scale_factor, 30 * scale_factor);

    ctx.font = "160px Open Sans";
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";

    ctx.fillStyle = background_color;
    ctx.fillText(label, midx, midy);
    ctx.restore();
}

export function getByValue(map, searchValue) {
    for (let [key, value] of map.entries()) {
      if (value === searchValue)
        return key;
    }
  }