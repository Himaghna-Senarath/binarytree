import { React, useState, useEffect, useRef } from 'react';
import { Util } from './../BST'
import { binaryTree, AVLTree } from './../BST'

function TreeViz(props) {

  let node_size = props.node_size
  let tree = props.tree
  let x = props.node_cordinates.x
  let y = props.node_cordinates.y

  let tree_depth = props.tree_depth
  let current_depth = props.current_depth
  let depth_left = tree_depth + 1 - current_depth

  let connector_contact_point = props.connector_contant_point
  let node_connector_length = props.node_connector_length
  let node_connector_height = props.node_connector_height

  let min = 270, max = 360
  let range = max - min
  let contant_point_angleR = connector_contact_point * range / 100 + min  // right side connector (range: 270 to 360)
  let contant_point_angleL = contant_point_angleR * -1 + 180 // left side connector (range: 180 to 270)

  let highlight = props.highlight
  let highlight_color = props.highlight_color

  return (<>
    <circle
      cx={x}
      cy={y}
      r={node_size}
      stroke={PALLETE["border_and_line"]}
      strokeWidth={5}
      fill={highlight.includes(tree.id) ? highlight_color : PALLETE["node"]}
    />
    <text
      x={x}
      y={y}
      textAnchor="middle"
      stroke="black"
      fontSize={(node_size / (((tree.item.toString()).length < 3 ? 2 : tree.item.toString().length) /2))}
      fontFamily="consolas"
      strokeWidth="1px"
      alignmentBaseline="middle"
    >
      {tree.item}
    </text>
    {tree.right != null &&
      <>
        <line
          x1={
            Math.cos(contant_point_angleR * (Math.PI / 180)) * (node_size) + x
          }
          y1={
            Math.sin(contant_point_angleR * (Math.PI / 180)) * (node_size) * (-1) + y
          }
          x2={x + (Math.pow(2, depth_left -1) * node_connector_height) / 4 * (node_size * 2)}
          y2={y + (node_size * node_connector_length) * 3}
          style={{ stroke: PALLETE["border_and_line"], strokeWidth: 5 }}
        />
        <TreeViz
          {...props}
          current_depth={current_depth+1}
          node_cordinates={
            {
              x: x + (Math.pow(2, depth_left -1) * node_connector_height) / 4 * (node_size * 2),
              y: y + (node_size * node_connector_length) * 3 + node_size
            }
          }
          tree={tree.right}
        />
      </>}
    {tree.left != null &&
      <>
        <line
        x1={
          Math.cos(contant_point_angleL * (Math.PI / 180)) * (node_size) + x
        }
        y1={
          Math.sin(contant_point_angleL * (Math.PI / 180)) * (node_size) * (-1) + y
        }
        x2={x - ((Math.pow(2, depth_left -1) * node_connector_height) / 4 * (node_size * 2))}
        y2={y + (node_size * node_connector_length) * 3}
        style={{ stroke: PALLETE["border_and_line"], strokeWidth: 5 }}
      />
      <TreeViz
        {...props}
        current_depth={current_depth+1}
        node_cordinates={
          {
            x: x - ((Math.pow(2, depth_left -1) * node_connector_height) / 4 * (node_size * 2)) ,
            y: y + (node_size * node_connector_length) * 3 + node_size
          }
        }
        tree={tree.left}
      />
    </>}
  </>)
}

function TreeVizSVG(props) {
  let tree_info_font_size = 13
  let tree_info = props.tree_info
  let tree_info_l = []

  let tree_info_l_width = 10
  let i = 0

  for (let key in tree_info) {
    let y = (100 - ((i + 1) * 3.5)).toString().concat("%")
    let x = "80%"
    tree_info_l[i] = (
      <text
        style={{
          position: "absolute",
          right: "0px",
          fontSize: "100%"
        }}
        key={i}
        x={x}
        y={y}
        strokeWidth="0.3px"
        textAnchor="middle"
        alignmentBaseline="left">
        {key} = {tree_info[key].toString()}
      </text>
    )
    i++
  }
  return (
     <svg style={{
      position: "relative",
      left:"0px",
      right:"0px",
      height:"100%",
      width:"100%",
    }}>
      <TreeViz {...props}/>
      {tree_info_l}
    </svg>)
}


function TreeConfig(props) {
  const [showsettings, setShowSettings] = useState(false)

  return (
    <div style={{
      position: "absolute",
      right: "0px",
      top: "0px",
      width: showsettings ? (props.w /100 * 30 + "px") : "30px",
      maxWidth: "100%",
    //  height: showsettings ? (((props.w > 512? 200 : props.w) /100 * 30 * 3.5 ) + "px") : "30px",
      maxHeight: "100%",
      padding: showsettings ? "1%" : "0%",
      borderStyle: "solid"
    }}>
      {<button
        style={{
          width: "100%",
          height: "32px",
          maxWidth:"32px",
          float: "right",
          maxHeight:"32px",
          border: showsettings ? "2px solid black" : "#FFFFFF"
        }}
        onClick={() => setShowSettings(!showsettings)}>
        {"☰"}
      </button>}
      {showsettings && <form>
          <input
            style={{
              width:"60%",
              maxWidth: "120px",
              height: "100%"
            }}
            id="connector_contact_point"
            type="range"
            min="1"
            max="100"
            defaultValue="0"
            onChange={(e) => props.configConnectorContactPoint(e.target.value)}
          />
          <label
            htmlFor="connector_contact_point"
            style={{
               fontFamily: "consolas",
               fontSize: "100%",
               padding: "5%"
             }}>
            connector contact
          </label>
          <br></br>
          <input
            style={{
              width:"60%",
              maxWidth: "120px",
              textAlign: "left"
            }}
            id="connector_length"
            type="range"
            min="7"
            max="20"
            defaultValue="0"
            onChange={(e) => props.configNodeConnectorLength(e.target.value / 10)}
          />
          <label
            htmlFor="connector_length"
            style={{
               fontFamily: "consolas",
               fontSize: "100%",
               padding: "5%"
             }}>
            connector height
          </label>
          <br></br>
          <input
            style={{
              width:"60%",
              maxWidth: "120px",
              textAlign: "left"
            }}
            id="connector_width"
            type="range"
            min="10"
            max="30"
            defaultValue="10"
            onChange={(e) => props.configNodeConnectorHeight(e.target.value / 10)}
          />
          <label
            htmlFor="connector_width"
            style={{
               fontFamily: "consolas",
               fontSize: "100%",
               padding: "5%"
             }}>
            connector width
          </label>
          <hr style={{
             borderTop: "1px solid #000000",
             width: "100%"
           }}
          />
          <input
            type="checkbox"
            id="set_tree_auto_balance"
            defaultChecked={false}
            onChange={(e) => props.configAutoBalanceAVL(e.target.value)}
            />
          <label
            htmlFor="set_animation"
            style={{
               fontFamily: "consolas",
               fontSize: "95%",
               padding: "3%"
             }}>
            auto balance (AVL)
          </label>
          <br></br>
          <input
            type="checkbox"
            id="set_animation"
            defaultChecked={true}
            onChange={(e) => props.configAnimation(e.target.value)}
            />
          <label
            htmlFor="set_animation"
            style={{
               fontFamily: "consolas",
               fontSize: "95%",
               padding: "3%"
             }}>
            tree animations
          </label>
          <hr style={{
             borderTop: "1px solid #000000",
             width: "100%"
           }}
          />
          <a
            href={BR_LINK}
            style={{
               fontFamily: "consolas",
               fontSize: "95%",
               padding: "3%"
             }}>
            bug/problem?
          </a>
      </form>}
    </div>)
}

function TreeOperations(props) {
  const [insertValue, setInsertValue] = useState(0)
  const [searchValue, setSearchValue] = useState(0)
  const [deleteValue, setDeleteValue] = useState(0)

  const input_style = {
     width: "45%",
     maxWidth: "160px",
     height: "13%",
     maxHeight: "100px",
     maxHeight: "29px",
     fontSize: "100%",
  }

  const input_btn_style = {
     width: "45%",
     maxWidth: "200px",
     height: "16%",
     maxHeight: "35px",
     fontSize: "87%",
     padding: "0.1%"
  }
  return (
    <div style={{
      position: "absolute",
      left: "0px",
      height: "200px",
      width: "69%",
    }}>
      <input style={input_style} type="text" onChange={(e) => props.onInsertValChange(e.target.value)} value={props.insertVal} />
      <button style={input_btn_style} onClick={() => props.onInsert(props.insertVal)}>Insert Number</button>
      <br></br>
      <input style={input_style} type="text" onChange={(e) => setSearchValue(e.target.value)}/>
      <button style={input_btn_style} onClick={() => props.onSearch(searchValue)}>Search Number</button>
      <br></br>
      <input style={input_style} type="text" onChange={(e) => setDeleteValue(e.target.value)}/>
      <button style={input_btn_style}  onClick={() => props.onDelete(deleteValue)}>Delete Number</button>
    </div>
  )
}

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

export const useContainerDimensions = myRef => {
  const getDimensions = () => ({
    width: myRef.current ? myRef.current.offsetWidth : 0,
    height: myRef.current ? myRef.current.offsetHeight : 0
  })

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (myRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions;
};

const BORDER_OFFSET = 5
const INITIAL_TREE_VAL = 4
const DEPTH_LIMIT = 10
const ANIMATION_DELAY = 1000
const UNIFORM_NODE_SIZE = 3 // keep node size uniform uptil depth of 3
const SVG_PREF_HEIGHT = 410
const ALLOW_DUPS = false

const PALLETE = {
    "node":"#008000",
    "node_traverse_highlight":"#00FF00",
    "node_delete_highlight":"#ff0000",
    "node_found_highlight":"#FFFF00",
    "border_and_line": "#000000"
}

const BR_LINK = ""

function Tree(props) {
  const [tree_id, set_tree_id] = useState(0)

  const [highlight, setHighlight] = useState([])
  const [highlight_color, setHighlightColor] = useState(PALLETE["node_traverse_highlight"])
  const [autobalance, setAutoBalance] = useState(false)

  const [animation, setAnimation] = useState(true)

  const [ConnectorContactPoint, setConnectorContactPoint] = useState(0)
  const [node_connector_length, setNodeConnectorLength] = useState(1.0)
  const [node_connector_height, setNodeConnectorHeight] = useState(1.0)
  const [tree, setTree] = useState(new binaryTree(INITIAL_TREE_VAL))
  const [insertVal, setInsertVal] = useState("")

  let info = Util.tree_info(tree)

  let depth = info[0]
  let node_count = info[1]
  let tree_type = info[2]

  let tree_type_str = ""
  for (let type in tree_type) {
    if (tree_type[type]) tree_type_str = tree_type_str.concat((tree_type_str.length != 0 ? " | " : "") + type)
  }
  tree_type_str = tree_type_str == "" ? "?" : tree_type_str

  let tree_info = {
    "height":  depth + " (max: 10)",
    "size": node_count,
    "tree type": tree_type_str
  }

  const svg_container = useRef()

  const {width, height} = useContainerDimensions(svg_container)

  let node_size = height / ((depth < UNIFORM_NODE_SIZE + 1 ? UNIFORM_NODE_SIZE : depth) + (depth < UNIFORM_NODE_SIZE + 1 ? UNIFORM_NODE_SIZE : depth * node_connector_length)) / 2
  let node_cordinates = {x: width / 2 , y: node_size + (BORDER_OFFSET * 2)}

  /*
   * supports inputs like "0,1,2,3" and ranges like "0-9" and "--random"
   */
  function parse_op_values(phrase) {
    const comma_sep_values = RegExp("^([0-9]+,){2,}$").test(phrase.slice(-1) == "," ? phrase : phrase + ",")
    const range = RegExp("^[0-9]+-[0-9]+$").test(phrase)

    if (comma_sep_values) {
      return phrase.split(",")
    }

    else if (range) {
      let s = phrase.split("-")
      let range_l = parseInt(s[0])
      let range_h = parseInt(s[1])
      let vals = []

      if (range_l <= range_h) {
          while (range_h >= range_l) {
            vals.push(range_l)
            range_l+=1
        }
      }
      return vals
    } else if (RegExp("^--").test(phrase.toUpperCase())) {
      let i = phrase.slice(2)
      if (i == "random") {
        return [Math.floor(Math.random() * 1000) * (Math.floor(Math.random() > 0.5 ? -1 : 1)) ]
      }
    }

    return []
  }

  function switch_tree(old, new_t) {
    let d = Util.all_items(old)
    let t = new new_t(d[0] == null ? 0 : d[0])
    d = d.slice(1, d.length)
    for (const i in d) {
      t.insert(d[i])
    }
    return t
  }

  function create_highlight(ids, endAction) {
    let current = 0
    let end = ids.length

    let counter = setInterval((l) => {
      if (current == (end)) {
        endAction()
      }
      if (current >= end) {
        setHighlight([])
        clearInterval(counter)
      } else {
        setHighlight( Symbol.iterator in Object(l[current]) ? l[current] : [l[current]] )
        current++
      }
    }, ANIMATION_DELAY, ids);
  }

  const invoke_render = () => {

    // reset tree if exceeds DEPTH_LIMIT
    if (Util.depth(tree) >= DEPTH_LIMIT) {
        setInsertVal(Math.floor(Math.random() * 100) == 100 ? "(tree is too big)" : "(tree is too big)")
        setTree(new binaryTree(INITIAL_TREE_VAL))
    }

    set_tree_id(Math.floor(Math.random() * 1000000))
  }

  let final_height = SVG_PREF_HEIGHT + BORDER_OFFSET

  let w = width.toString().concat("px")
  let h = final_height.toString().concat("px")

  return (
    <div>
      <b>Binary Tree</b>
      <div
      ref={svg_container}
      style={{
        position:"relative",
        height: h,
        maxWidth: "100%",
        margin: "1%",
        borderStyle: "solid",
      }}>
        <TreeVizSVG
          svg_height={final_height}
          svg_width={width}
          pallete={PALLETE}
          tree={tree}
          tree_depth={depth}
          current_depth={1}
          node_size={node_size}
          node_cordinates={node_cordinates}

          tree_info={tree_info}

          node_connector_height={node_connector_height}
          node_connector_length={node_connector_length}
          connector_contant_point={ConnectorContactPoint}

          highlight={highlight}
          highlight_color={highlight_color}
        />
      </div>
      <div
      style={{
        position:"relative",
        maxWidth: "100%",
        maxHeight: "100%",
        height: "500px",
        margin: "1%",
      }}>
        <TreeOperations
          insertVal={insertVal}
          onInsertValChange={setInsertVal}
          onInsert={(e) => {
            let vals = parse_op_values(e)

            for (let i = 0, h = vals.length; i < h; i++) {
                if (ALLOW_DUPS || !Util.tree_search(tree, vals[i])[0]) tree.insert(vals[i])
            }

            invoke_render()

            e = parseInt(e)
            if (vals.length == 0 && !Number.isNaN(e)) {
                let r = Util.tree_search(tree, e)
                let found = r[0]
                if (ALLOW_DUPS || !found) {
                  if (animation) {

                    let path = r[1]

                    if (!r[0]) {
                    create_highlight(path, () => {
                      tree.insert(e)
                      invoke_render()

                      let p = Util.tree_search_d(tree, e, true)[1]
                      create_highlight([p[p.length-1]], () => {})
                    })
                  }
                } else {
                  tree.insert(e)
                  invoke_render()
                }

            }
          }}}
          onDelete={(e) => {

              let vals = parse_op_values(e)

              for (let i = 0, h = vals.length; i < h; i++) {
                  tree.delete(vals[i])
              }

              invoke_render()

              e = parseInt(e)
              if (vals.length == 0 && !Number.isNaN(e)) {
                  if (animation) {
                    let search = Util.tree_search(tree, e)
                    let search_path = search[1]
                    let found = search[0]
                    create_highlight(search_path.slice(0, search_path.length-1), () => {
                      setHighlightColor(PALLETE["node_delete_highlight"])
                      if (found) {
                        create_highlight([search_path[search_path.length-1]], () => {
                          tree.delete(e)
                          invoke_render()
                          setHighlightColor(PALLETE["node_traverse_highlight"])
                        })
                      }
                    })
                  } else {
                    tree.delete(e)
                    invoke_render()
                  }
              }
            }
          }
          onSearch={(e) => {

            if (e == "ALL" || e == "all") {
              let l = Util.all_x(tree, "id")
              let i = 3
              let h = []
              while (i != 0) {
                h.push(l)
                h.push([])
                i-=1
              }
              create_highlight(h, ()=>{})
            }

            e = parseInt(e)
            if (!Number.isNaN(e)) {
              if (animation) {
                let search = Util.tree_search(tree, e)
                let search_path = search[1]
                let found = search[0]
                create_highlight(search_path, () => {
                  if (found) {
                    create_highlight([search_path[search_path.length-1]], ()=>{})
                  }
                })

                invoke_render()
              } else {
                tree.search(e)
                invoke_render()
              }
            }
          }
          }
        />
        <TreeConfig
          w={width}
          configAnimation={(value) => {setAnimation(!animation)}}
          configAutoBalanceAVL={(value) => {setTree(switch_tree(tree,  autobalance ? binaryTree : AVLTree)); setAutoBalance(!autobalance)}}
          configConnectorContactPoint={(value) => setConnectorContactPoint(value)}
          configNodeConnectorLength={(value) => setNodeConnectorLength(depth > UNIFORM_NODE_SIZE ? value : 1)}
          configNodeConnectorHeight={(value) => setNodeConnectorHeight(value)}
        />
      </div>
  </div>
  )
}

export default Tree
