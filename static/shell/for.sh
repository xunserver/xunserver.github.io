add() {
    echo "当前参数个数: $#"
    echo $@
    bb=$@
    echo "${bb[1]}"
    for ((i=1;i<=$#;i++)); do
        echo "${i} $((i))"
    done
}
add 1 3 2