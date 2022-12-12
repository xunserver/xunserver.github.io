sum() {
    sum_a=$1
    sum_b=$2
    echo $(($1+$2))
}
result=$(sum 3 5)
echo $result