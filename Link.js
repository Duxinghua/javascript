function LinkedList() {
    // 定义辅助类Node
    var Node = function(element) {
        this.element = element;    // element属性，即要添加到列表的元素
        this.next = null;    // next属性，即指向列表中下一个节点项的指针
    }

    var length = 0;    // 内部属性/私有变量
    var head = null;    // 第一个节点的引用

    // 向列表的尾部添加一个新的项
    this.append = function(element) {
        var node = new Node(element),    // 把element作为值传入，创建Node项
            current;

        if (head === null) {    // 列表中第一个节点，如果head元素为null，则意味着向列表添加第一个元素
            head = node;    // head指向node元素，下一个node将会自动生成null
        } else {
            current = head;

            // 循环列表，直到找到最后一项
            while(current.next) {
                current = current.next;
            }

            // 找到最后一项，将其next赋为node，建立连接
            current.next = node;    // 列表中最后一个节点的下一个元素始终是null
        }

        length++;    // 更新链表长度，这样就能控制它，轻松地得到列表的长度
    };

    // 向列表的特定位置插入一个新的项
    this.insert = function(position, element) {
        // 检查越界值
        if (position >= 0 && position <= length) {
            var node = new Node(element),
                current = head,
                previous,
                index = 0;

            if (position === 0) {    // 在第一个位置添加
                node.next = current;
                head = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }

            length++;

            return true;

        } else {
            return false;
        }
    };

    // 从列表的特定位置移除一项
    this.removeAt = function(position) {
        // 检查越界值
        if (position > -1 && position < length) {
            var current = head,    // current变量总是为对所循环列表的当前元素的引用
                previous,    // previous变量为对当前元素的前一个元素的引用
                index = 0;

            // 移除第一项
            if (position === 0) {
                head = current.next;
            } else {
                while (index++ < position) {    // 使用用于内部控制和递增的index变量来迭代列表
                    previous = current;    
                    current = current.next;
                }

                // 将previous与current的下一项链接起来：跳过current，从而移除它
                previous.next = current.next;
            }

            length--;

            return current.element;
        } else {
            return null;
        }
    };

    // 从列表中移除一项
    this.remove = function(element) {
        var index = this.indexOf(element);
        return this.removeAt(index);
    };

    // 返回元素在列表中的索引。如果列表中没有该元素则返回-1
    this.indexOf = function(element) {
        var current = head,
            index = -1;

        while (current) {
            if (element === current.element) {
                return index;
            }
            index++;
            current = current.next;
        }

        return -1;
    };

    // 如果链表中不包含任何元素，返回 true，如果链表长度大于 0 则返回 false
    this.isEmpty = function() {
        return length === 0;
    };

    // 返回链表包含元素个数。与数组的 length 属性类似
    this.size = function() {
        return length;
    };

    // 由于列表项使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 toString 方法，让其只输出元素的值
    this.toString = function() {
        var current = head,
            string = '';

        while (current) {
            string += current.element;
            current = current.next;
        }

        return string;
    };

    this.getHead = function () {
        return head;
    };
}