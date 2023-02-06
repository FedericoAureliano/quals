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
            return state;
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
    ctx.font = "300px Open Sans";
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
    ctx.font = "300px Open Sans";
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

    ctx.font = "200px Open Sans";
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

export function add_label_to_shape(layer, shape, label, color) {
    var text = new Konva.Text({
        x: shape.x() + 10,
        y: shape.y() + 10,
        text: label,
        width: shape.width() - 15,
        align: 'left',
        fontSize: 24,
        fontFamily: 'Open Sans',
        fill: color,
    });
    layer.add(text);
    return text;
}

export function draw_rectangle_konva(layer, x, y, width, height, corners, fill_color, outline_color, text_color, label) {
    var rect = new Konva.Rect({
        x: x,
        y: y,
        width: width,
        height: height,
        fill: fill_color,
        stroke: outline_color,
        strokeWidth: 5,
        cornerRadius: corners,
    });

    var text = add_label_to_shape(layer, rect, label, text_color);

    layer.add(rect);
    layer.add(text);

    return [rect, text];
}

export function draw_arrow_konva(layer, from_shape, to_shape, arrow_color, label_color, label) {
    var points = [];

    const from_center_y = from_shape.y() + from_shape.height() / 2;
    const to_center_y = to_shape.y() + to_shape.height() / 2;

    if (from_center_y < to_center_y) {
        points = [from_shape.x() + from_shape.width(), from_shape.y() + from_shape.height() / 2, to_shape.x() - 10, to_shape.y() + to_shape.height() / 2 - 10];
    } else if (from_center_y > to_center_y) {
        points = [from_shape.x() + from_shape.width(), from_shape.y() + from_shape.height() / 2, to_shape.x() - 10, to_shape.y() + to_shape.height() / 2 + 10];
    } else {
        points = [from_shape.x() + from_shape.width(), from_shape.y() + from_shape.height() / 2, to_shape.x() - 10, to_shape.y() + to_shape.height() / 2];
    }

    var arrow = new Konva.Arrow({
        points: points,
        pointerLength: 10,
        pointerWidth: 10,
        fill: arrow_color,
        stroke: arrow_color,
        strokeWidth: 5,
    });
    layer.add(arrow);

    // add text on middle of arrow matching angle of arrow
    var text = new Konva.Text({
        x: points[0],
        y: points[1] + 5,
        text: label,
        width: points[2] - points[0],
        align: 'center',
        fontSize: 24,
        fontFamily: 'Open Sans',
        fill: label_color,
    });
    // find angle of arrow
    var angle = Math.atan2(points[3] - points[1], points[2] - points[0]) * 180 / Math.PI;
    text.rotate(angle);
    layer.add(text);

    return [arrow, text];
}