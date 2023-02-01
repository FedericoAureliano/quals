export const background_color = "white";
export const primary_color = "#003262";
export const secondary_color = "#3B7EA1";
export const tertiary_color = "#00A598";
export const quaternary_color = "#FDB515";

export function step(e, state, dissappear_funcs, appear_funcs) {
    // assert(dissappear_funcs.length == appear_funcs.length);

    state += 1;
    if (state >= appear_funcs.length) {
        state = 0;
    }

    const to_remove = dissappear_funcs[state];
    for (let i = 0; i < to_remove.length; i++) {
        to_remove[i]();
    }

    const to_draw = appear_funcs[state];
    for (let i = 0; i < to_draw.length; i++) {
        to_draw[i]();
    }

    return state;
}

export function draw_node(rc, ctx, x, y, radius, label, color, fill_color=null) {
    ctx.font = "25pt Open Sans";
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillStyle = color;
    ctx.fillText(label, x, y);
    if (fill_color) {
        rc.circle(x, y, radius * 2, {
            stroke: color, 
            strokeWidth: 10,
            fill: fill_color,
            fillStyle: 'zigzag',
            fillWeight: 5,
            hachureGap: 25
        });
    } else {
        rc.circle(x, y, radius * 2, {
            stroke: color, strokeWidth: 10,
        });
    }
        
    ctx.restore();
}

export function gen_node(gen, x, y, radius, color) {
    return gen.circle(x, y, radius * 2, {
        stroke: color, strokeWidth: 10,
    })
}

export function draw_node_from_gen(rc, ctx, node, x, y, label, color) {
    ctx.font = "25pt Open Sans";
    ctx.textBaseline = 'middle';
    ctx.textAlign = "center";
    ctx.fillStyle = color;
    ctx.fillText(label, x, y);
    rc.draw(node);
    ctx.restore();
}

export function draw_arrow(ctx, fromx, fromy, tox, toy, label, arrow_color, label_color) {
    const dx = tox - fromx;
    const dy = toy - fromy;
    const headlen = Math.sqrt(dx * dx + dy * dy) * 0.2; // length of head in pixels
    const angle = Math.atan2(dy, dx);

    ctx.fillStyle = arrow_color;
    ctx.strokeStyle = arrow_color;
    ctx.lineWidth = 10;
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
    ctx.fillRect(midx - 15, midy - 15, 30, 30);

    ctx.font = "20px Open Sans";
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