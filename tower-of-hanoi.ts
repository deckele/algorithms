function moveTower(towerLevels: number = 3) {
    if (towerLevels <= 1) {
        return 1;
    }
    return 1 + 2 * moveTower(towerLevels - 1)
}